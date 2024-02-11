import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftCircle } from 'react-bootstrap-icons';

const NotFoundPage = () => {

  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  }

 

  return (
    <div className="not-found">
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    
      <button  onClick={navigateToHome}>
        <ArrowLeftCircle size={25} style={{ marginRight: '8px' }} /> Return to HomePage
      </button>
    </div>
  );
}

export default NotFoundPage;
