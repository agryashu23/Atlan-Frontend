import React from 'react'

const Topup = (props) => {
  return (
    <div className="modal d-block" tabindex="-1" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', marginTop:"80px "}}>
           <div className="modal-dialog" role="document">
             <div className="modal-content">
              <div className="modal-header">
              <h5 className="modal-title">Model is {props.data}.....</h5>
              </div>
             <div className="modal-body text-center">
                <div className="spinner-border text-primary" role="status">
               </div>
                 <h6>Do You Know?</h6>
                 <p>Here's an interesting fact: Artificial Intelligence can learn to identify patterns in data that humans can't see.</p>
             </div>
           </div>
          </div>
     </div>
  )
}

export default Topup;
