import React, { useContext, useEffect, useState, useRef } from 'react'
import Productshow from './Productshow'
import Notecontext from './Context/Notecontext'

function Updatepro(props) {

  const context = useContext(Notecontext)
  const { products, updateProduct, getallProducts, deleteProduct } = context;
  useEffect(() => {
    getallProducts()
  }, []);

  const ref = useRef(null);

  const [product, setproduct] = useState({ _id: null, etitle: "", ebrand: "", edescription: "", equantity: "", eprice: "", eimage: null });

  const updatePro = (productId) => {
    ref.current.click();
    const currentProduct = products.find(product => product._id === productId);
    if (currentProduct) {
      setproduct({
        _id: currentProduct._id,
        etitle: currentProduct.title,
        ebrand: currentProduct.brand,
        edescription: currentProduct.description,
        equantity: currentProduct.quantity,
        eprice: currentProduct.price,
        eimage: currentProduct.image
      });
    }
  }

  const handleclick = (productId) => {
    updateProduct(productId, product.etitle, product.ebrand, product.edescription, product.equantity, product.eprice, product.eimage);
    // console.log('updated product :', product)
    ref.current.click(); // Close the modal
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file)

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {

        const base64String = reader.result;
        setproduct({ ...product, eimage: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const onChange = (e) => {
    setproduct({ ...product, [e.target.name]: e.target.value })
  }

  return (

    <>

      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Edit Note
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className='container my-4'>
              <form className="row g-3" onSubmit={handleclick}>
                <div className="col-md-6">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" value={product.etitle} onChange={onChange} className="form-control" name="etitle" id="etitle" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="ebrand" className="form-label">Brand Name</label>
                  <input type="text" value={product.ebrand} onChange={onChange} className="form-control" name="ebrand" id="ebrand" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="eimage" className="form-label">Upload Image</label>
                  <input type="file" className="form-control" onChange={handleImageChange} name="eimage" id="eimage" />
                </div>
                <div className="col-12">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <textarea type="text" onChange={onChange} value={product.edescription} className="form-control" name='edescription' id="edescription" placeholder="About Your Product like : size, color, design" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="eprice" className="form-label">Price</label>
                  <input type="text" onChange={onChange} value={product.eprice} className="form-control" name='eprice' id="eprice" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="equantity" className="form-label">Quantity</label>
                  <input type="text" onChange={onChange} value={product.equantity} className="form-control" name='equantity' id="equantity" min={1} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => handleclick(product._id)}>Update</button>
            </div>
          </div>
        </div>
      </div>

      <div>
        {
          products.map((item) => {
            return <Productshow key={item._id} updatePro={() => updatePro(item._id)} deleteProduct={() => deleteProduct(item._id)} item={item} />
          })
        }
      </div>

    </>
  )
}

export default Updatepro
