// // src/components/RegistrationForm.js
// import React, { useState } from 'react';
// import SignInImage from "../../assets/img/contact-img.svg";
// import "./SignIn.css";


// const SignPage = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
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
//     <div className="signIn-container">
//       <div className="signIn-form">
//         <form onSubmit={handleSubmit} className="form-login-block">
//           <h2>Sign In</h2>
//           <div className="form-group">
//             <input
//               type="email"
//               name="email"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Email"
//             />
//           </div>
//           <div className="form-group">
//             <input
//               type="password"
//               name="password"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               placeholder="Password"
//             />
//           </div>
//           <button className="login-button" type="submit">Sign In</button>
//         </form>
//         <div className="image-container-login">
//         <img src={SignInImage} alt="Sign Up" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignPage;
