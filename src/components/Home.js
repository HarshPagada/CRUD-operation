import React, { useContext, useState } from 'react'
import Notecontext from './Context/Notecontext';
import Updatepro from '../components/Updatepro';

export default function Home() {

  const context = useContext(Notecontext)
  const { addProduct, } = context;

  const [product, setProduct] = useState({
    title: "",
    brand: "",
    image: null,
    description: "",
    quantity: "",
    price: "",
  });

  const handleclick = (e) => {
    e.preventDefault();
    addProduct(product.title, product.brand, product.description, product.quantity, product.price, product.image)
    setProduct({ title: "", brand: "", image: null, description: "", quantity: "", price: "", })
    console.log('fulfilled')
  }

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onChangenext = (e) => {
    const file = e.target.files[0];
    console.log(file)

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
       
        const base64String = reader.result;
        setProduct({ ...product, image: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className='container my-4'>
        <h2 className='my-4'>Add Product</h2>
        <form className="row g-3" onSubmit={handleclick}>
          <div className="col-md-6">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" value={product.title} onChange={onChange} className="form-control" name="title" id="title" />
          </div>
          <div className="col-md-6">
            <label htmlFor="brand" className="form-label">Brand Name</label>
            <input type="text" value={product.brand} onChange={onChange} className="form-control" name="brand" id="brand" />
          </div>
          <div className="col-md-6">
            <label htmlFor="image" className="form-label">Upload Image</label>
            <input type="file" onChange={onChangenext} className="form-control" name="image" id="image" />
          </div>
          <div className="col-12">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea type="text" onChange={onChange} value={product.description} className="form-control" name='description' id="description" placeholder="About Your Product like : size, color, design" />
          </div>
          <div className="col-md-6">
            <label htmlFor="price" className="form-label">Price</label>
            <input type="text" onChange={onChange} value={product.price} className="form-control" name='price' id="price" />
          </div>
          <div className="col-md-6">
            <label htmlFor="quantity" className="form-label">Quantity</label>
            <input type="text" onChange={onChange} value={product.quantity} className="form-control" name='quantity' id="quantity" min={1} />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">Create</button>
          </div>
        </form>
      </div>

      <div className='container'>
        <h2>Your Added Product</h2>
        <Updatepro />
      </div>
    </>
  )
}
