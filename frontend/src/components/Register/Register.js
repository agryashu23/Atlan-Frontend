// // src/components/RegistrationForm.js
// import React, { useState } from 'react';
// import './Register.css'; 
// import RegisterImage from "../../assets/img/contact-img.svg"

// const RegisterPage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     console.log(formData);
//   };

//   return (
//     <div className="registration-container">
//       <div className="registration-form">
//         <form onSubmit={handleSubmit} className="form-register-block">
//           <h2>Sign Up</h2>
//           <div className="form-group">
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Your Name"
//             />
//           </div>
//           <div className="form-group">
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Your Email"
//             />
//           </div>
//           <div className="form-group">
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Password"
//             />
//           </div>
//           <div className="form-group">
//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               placeholder="Confirm Password"
//             />
//           </div>
//           <button className="register-button" type="submit">Register</button>
//         </form>
//         <div className="image-container-register">
//         <img src={RegisterImage} alt="Sign Up" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;
