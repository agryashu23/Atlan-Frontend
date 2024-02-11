const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const { object_func, image_func, text_func,convertBlobUrlToCloudinary } = require('./functions');
const cloudinary = require('cloudinary').v2;

dotenv.config();
const app = express();

app.use(cors()); 
app.use(express.json());

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: true,
    status: statusCode,
    message: err.message || 'Internal Server Error',
    details: err.details || {}, 
  });
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
  secure: true,
});

app.post('/api/model',async (req, res,next) => {
  const { data ,valueData} = req.body; 
  let options;
  if(valueData==="objectt"){
    const imageUrl = await convertBlobUrlToCloudinary(data);
    options = await object_func(imageUrl);
  }
  else if(valueData==="image"){
    const imageUrl = await convertBlobUrlToCloudinary(data);
    options = await image_func(imageUrl);
  }
  else{
    options = await text_func(data);
  }
  
  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

app.post('/api/update-model', async (req, res,next) => {
  const newModelData = req.body.data;
  const filePath = 'ModelsData.json';
  const owner = 'agryashu23';
  const repo = 'Atlan-Frontend';
  const branch = 'master'; 
  const token = process.env.GITHUB_TOKEN;
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;

 
  try {
    const imageUrl = await convertBlobUrlToCloudinary(newModelData.imageUrl);
    const updatedData  ={...newModelData, imageUrl: imageUrl};
    const getFileResponse = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const currentContentBase64 = getFileResponse.data.content;
    const currentContentStr = Buffer.from(currentContentBase64, 'base64').toString('utf-8');
    const currentData = JSON.parse(currentContentStr);
    currentData.push(updatedData);
    const sha = getFileResponse.data.sha;
    const updatedContentBase64 = Buffer.from(JSON.stringify(currentData)).toString('base64');
    const updateResponse = await axios.put(
      apiUrl,
      {
        message: 'Update JSON file via API',
        content: updatedContentBase64,
        sha: sha,
        branch: branch,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json({ success: true, data: updateResponse.data });
  } catch (error) {
    // res.status(500).json({ success: false, error: error.message });
    next(error);

  }
});

// app.post('/api/model/image', async (req, res) => {
//   const { data } = req.body; // Assuming you send the required data in the body

//   const encodedParams = new URLSearchParams();
//   encodedParams.set('prompt', 'dolar, yüzde, lira, rezerv, para');
//   encodedParams.set('id', '12345');
//   encodedParams.set('width', '768');
//   encodedParams.set('height', '768');
//   encodedParams.set('inferenceSteps', '50');
//   encodedParams.set('guidanceScale', '7.5');
//   encodedParams.set('img2img_strength', '0.75');
  
//   const options = {
//     method: 'POST',
//     url: 'https://arimagesynthesizer.p.rapidapi.com/generate',
//     headers: {
//       'content-type': 'application/x-www-form-urlencoded',
//       'X-RapidAPI-Key': 'f4ad1b3745msh742a36b5e1a9c27p1eb8f6jsnb7257a89bd2f',
//       'X-RapidAPI-Host': 'arimagesynthesizer.p.rapidapi.com'
//     },
//     data: encodedParams,
//   };
  
//   try {
//     const response = await axios.request(options);
//     const hash = response.data;
//     const options2 = {
//       method: 'GET',
//       url: 'https://arimagesynthesizer.p.rapidapi.com/get',
//       params: {
//         hash: `${hash}`,
//         returnType: 'image'
//       },
//       headers: {
//         'X-RapidAPI-Key': 'f4ad1b3745msh742a36b5e1a9c27p1eb8f6jsnb7257a89bd2f',
//         'X-RapidAPI-Host': 'arimagesynthesizer.p.rapidapi.com'
//       }
//     };
//     const response = await axios.request(options2);
//   } catch (error) {
//     console.error(error);
//   }
// });


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
