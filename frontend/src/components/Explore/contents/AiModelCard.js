import {React} from 'react';
import '../ModelCard.css';
import { useNavigate } from 'react-router-dom';

const AiModelCard = ({ model }) => {
  const navigate = useNavigate()

  const navigateToPage = () => {
    navigate(`/details/${model.title}`,{ state: { model:model} });
  };

  return (
    <div className= "model-card-2" >
    <img src={model.imageUrl} alt={model.title} className="model-photo-2" />
    <div className="model-card-content">
      <div className="model-detail">
        <h3 className="model-title-2">{model.title}</h3>
        <p className="model-category">{model.category}</p>
        <button onClick={navigateToPage} className="explore-btn">Explore More</button>
      </div>
      
    </div>
  </div>
    )
  
}

export default AiModelCard
