import {React, useRef,useState,useContext} from 'react'
import ExploreModels from './contents/ExploreModels';
import './ModelCard.css';
import 'animate.css';
import AiModelCard from './contents/AiModelCard';
import { useNavigate } from 'react-router-dom';
import GitHubDataContext  from './../context/Datacontext';
import Loading from './../../utils/Loading';
import { useEffect } from 'react';
import Error from './../../utils/Error';
import { Helmet } from 'react-helmet';

const Explore = () => {
  const scrollViewRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStartX, setScrollStartX] = useState(0);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [needRerender, setNeedRerender] = useState(false);
  const [sortCriteria, setSortCriteria] = useState('category');

  const {
    data,
    isLoading,
    error,
  } = useContext(GitHubDataContext);
  
  console.log(data);
  useEffect(()=>{
    if (needRerender) {
      setNeedRerender(false);
      
    }
   
  },[needRerender])

  if (data) {
    return <Error/>; 
  }

  const onDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.pageX);
    setScrollStartX(scrollViewRef.current.scrollLeft);
  };

  const onDragEnd = () => {
    setIsDragging(false);
  };

  const onDragMove = (e) => {
    if (!isDragging) return;
    const currentX = e.pageX;
    const walk = (currentX - startX);
    scrollViewRef.current.scrollLeft = scrollStartX - walk;
  };

  const scrollLeft = () => {
    scrollViewRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollViewRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };
  const navigateToPage=()=>{
        navigate("/create-model")
  }

  const filteredAndSortedData = data.filter((model) =>
    model.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    model.category.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => {
    if (sortCriteria === 'name') {
      return a.title.localeCompare(b.title);
    } else if (sortCriteria === 'category') {
      return a.category.localeCompare(b.category);
    } else {
      return a.popularity.localeCompare(b.popularity);
    }
  });


  if (isLoading) return <Loading/>;
  if (error) return <Error message={"Error while fetching data, Please try again."}/>

  return (
    <>
      <Helmet>
        <title>Explore</title>
        <meta name="description" content="Explore Page " />
      </Helmet>
      <div className="AI-background-posterr">
        <h2 className="tag-text">Featured Models</h2>
      <div className="scroll-view-container"  
        onMouseDown={onDragStart}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        onMouseMove={onDragMove}>
      <button style={{marginLeft:"10px"}} onClick={scrollLeft}>&lt;</button>
      <div className="scroll-view"  ref={scrollViewRef}>
      {data && data
          .filter(model => model.popularity === "10")
          .map(model => (
            <ExploreModels key={model.id} model={model} />
          ))
      }
        </div>
      <button style={{marginRight:"10px",right:"0"}} onClick={scrollRight}>&gt;</button>
    </div>
      </div>

    <div style={{width:"100%"}}>
          <h4 style={{textAlign:"center", color:"black", marginTop:"20px"}}>All Models</h4>
    <div className="AI-model-container">
      <div className="card-container-search">
        <input type="text" placeholder="Search Name/Category" className="search-bar" value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}/>
        <div className="sort-by-dropdown">
          <label style={{color:"white",marginRight:"10px"}} htmlFor="sortby">Sort by:</label>
          <select id="sortby" name="sortby" onChange={(e) => setSortCriteria(e.target.value)}>
            <option value="category">Category</option>
            <option value="name">Name</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
      </div>
              <div className="model-list">
              {data && filteredAndSortedData.map((model) => (
                    <AiModelCard key={model.id} model={model} />
                  ))}
              </div>
      </div>
    </div>
         
    <button className="fab" onClick={navigateToPage}>
      +
    </button>
    </>
  )
}

export default Explore;
