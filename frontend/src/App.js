import React,{useContext} from 'react';
import './App.css';
import NavBar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import {Route, Routes} from "react-router-dom";
import Explore from './components/Explore/Explore';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModelDetail from './components/ModelDetails/ModelDetail';
import RegisterPage from './components/Register/Register';
import SignPage from './components/SignIn/SignIn';
import CreateModelCard from './components/CreateModel/createModel';
import { Footer } from './components/Footer/Footer';
import NotFoundPage from './components/NotFound/NotFoundPage';
import { NetworkContext } from './components/context/NetworkContext';
import Internetconnection from './components/InternetConnection/Internetconnection';


const App = () => {
  const isOnline = useContext(NetworkContext);
  if (!isOnline) {
    return <Internetconnection/>
  }
  return (
    <div className="root">
    <div className="page-container">
        <NavBar/>
      <div className="content-wrap">
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/details/:title' element={<ModelDetail/>} />
            {/* <Route path='/signin' element={<SignPage/>} />
            <Route path='/register' element={<RegisterPage/>} /> */}
            <Route path='/create-model' element={<CreateModelCard/>} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
      </div>
      <Footer/>

   </div>
   </div>
  );
}

export default App;
