import React, { useState} from 'react';
import {useLocation} from "react-router-dom";
import "./ModelDetail.css";
import Topup from ".././TopupModal/Topup";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import AddImage from "../../assets/img/add-image.jpeg";
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const ModelDetail=()=>{
  const location = useLocation();
  const model = location.state?.model;
  const [output, setOutput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isVisible , setIsVisible] = useState(true);
  const [textValue, setTextValue] = useState(""); 
  const [type,setType] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [valueData,setValueData] = useState("");
  const [needRerender, setNeedRerender] = useState(false);

  useEffect(()=>{
    if (needRerender) {
      setNeedRerender(false);
    }
      if(model.input_type==="Image"){
        setType(false);
      }
      if(model.title==="YOLO"){
        setValueData("objectt");

      }
      else if(model.title==="OCR - Text Extractor"){
        setValueData("image");
      }
      else{
        setValueData("text");
      }
      
      
  },[model.input_type, model.title, needRerender, selectedImage]);
  const showAlert = () => {
    setShowModal(false);
    alert("Some error occured, Please try again");
    setNeedRerender(true); 
  };

const handleChange = (e) => {
  if(type){
    setTextValue(e.target.value)
  }
  else{
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const dataURL = reader.result;
      setSelectedImage(dataURL);
    };
    reader.readAsDataURL(file);
  }
};
  const handleTryModelClick = () => {
    setIsVisible(false);
  };

  const handleReset = () => {
    setTextValue("");
  setSelectedImage(null);
  setOutput('');
};



const GPT_Text = async (data) => {
  try {
    console.log(valueData);
    const response = await axios.post(
     'http://localhost:3001/api/model',
      { data, valueData },
     );
     return response;
  } catch (error) {
    return showAlert();
  }
};

const tryModel = async () => {
  if(textValue==="" && selectedImage===null){
    alert("Please enter the input data");
  }
  setShowModal(true);
  try {
    const data = type?textValue:selectedImage;
    const response = await GPT_Text(data); 
    console.log(response.data);
    const Finalresult = valueData==="image"?response.data.text:valueData==="objectt"?response.data.results.map(result => result.label).join(','):response.data.result; 
    setOutput(Finalresult); 
  } 
  catch (error) {
    return showAlert();
  } finally {
    setShowModal(false);
    setIsVisible(true); 
  }
};
  return (
    <>
     <Helmet>
        <title>{model.title}</title>
        <meta name="description" content="Model Page " />
      </Helmet>
    <div className="card model-container">
    {showModal && (
      <Topup data="building"/>
    )}
    <div className="card-content">
      <div className="details-section">
        <div className="model-section card">
          <div className="card-body">
            <h2 className="model-title-detail">{model.title} - {model.category}</h2>
          </div>
        </div>
        <div className="model-section card">
          <div className="card-body">
            <p><strong>Description:</strong> {model.description}</p>
            <p><strong>Provider:</strong> {model.provider}</p>
          </div>
        </div>
        <div className="model-section card use-case-card">
          <div className="card-body">
            <h5>Potential Use Cases</h5>
            <ul>
              {model.use_cases.map((useCase, index) => (
                <li key={index}>{useCase}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="execution-section">
        <div className="model-section card">
          <div className="card-body">
            <div className="code-snippet">
              <h3>Example Usage</h3>
              <div className="code-frame">
                <pre><code>{model.code_snippet}</code></pre>
              </div>
            </div>
            <div>
            <div style={{display : `${isVisible ? 'block' : 'none'}`}} >
            <button onClick={handleTryModelClick} className="try-model-btn">Try Model</button>
            </div>
            <div style={{ display: `${isVisible ? 'none' : 'block'}`, width: "100%" }}>
          <div className="text-area-detail">
            {type?(
              <textarea
              value={textValue}
              rows="3"
              onChange={handleChange}
              placeholder="Enter Text"
            ></textarea>
            ):(
              <div className="image-upload-container-details">
            <input 
            //   key={inputKey}
              type="file"
              id="fileInput"
              onChange={handleChange} 
              style={{ display:'none'}} 
            />
            <label htmlFor="fileInput" className="image-upload-label-create">
              {selectedImage ? (
                <img src={selectedImage}  alt="Uploaded" className="uploaded-image-create" />
              ) : (
                <img src={AddImage} alt="Add-Gallery" className="add-image-modal" loading="lazy"/>
              )}
            </label>
          </div>
            )}
            
   
  </div>
  <div className="submit-button" style={{ textAlign: 'left' }}> 
    <Button variant="primary" type="submit" onClick={tryModel}>
      Submit
    </Button>
    <Button variant="primary" onClick={handleReset} type="reset">
      Reset
    </Button>
  </div>
</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="model-output card">
      <div className="card-body">
        <h4>Output:</h4>
        <p>{output}</p>
      </div>
    </div>
  </div>
  </>
  );
}

export default ModelDetail;

