import React from 'react';

const Loading = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px',backgroundColor:"white",width:"30%",marginLeft:"35%",borderRadius:"10px"}}>
      <p style={{marginTop:"10px"}}>Loading...</p>
      <div className="modal-body text-center">
        <div className="spinner-border text-primary" role="status">
        </div>
        <h6>Do You Know?</h6>
        <p>Here's an interesting fact: Artificial Intelligence can learn to identify patterns in data that humans can't see.</p>
    </div>
    </div>
  );
};

export default Loading;
