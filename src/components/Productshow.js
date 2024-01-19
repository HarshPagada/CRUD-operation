import React, { useContext, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import Notecontext from './Context/Notecontext';

export default function Productshow(props) {

  const context = useContext(Notecontext)
  const { deleteProduct } = context;
  const { item, updatePro } = props;

  // console.log("item", item.image);


  return (
    <>
      <div className='container my-4'>
        <div className="card mb-3 ">
          <div className="row g-0">
            <div className="col-md-4">
              {item?.image ? (<img src={item?.image} style={{ width: "100%", height: "100%" }} alt="product image" />) : (<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png' style={{ width: "100%", height: "100%" }} alt='not loaded' />)}
            </div>
            <div className="col-md-8">
              <div className='d-flex justify-content-end'>
                <FontAwesomeIcon className='my-2 mx-1' icon={faPenToSquare} onClick={() => { props.updatePro(item._id) }} />
                <FontAwesomeIcon className='my-2 mx-2' icon={faTrash} onClick={() => { props.deleteProduct(item._id) }} />
              </div>
              <div className="card-body">
                <h5 className="card-title">Title: {item.title}</h5>
                <h5 className="card-title">Brand: {item.brand}</h5>
                <p className="card-text">{item.description}</p>
                <h5 className="card-title">Quentity : {item.quantity}</h5>
                <h5 className="card-title">Price : &#8377;{item.price}</h5>
                {/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
