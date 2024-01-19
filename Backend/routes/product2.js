const express = require('express')
const router = express.Router();
const product = require('../models/product')
const mongoose = require('mongoose')

// Route : 1  Create a new product (without user authentication) "api/product2/create"
router.post('/create', async (req, res) => {
  try {
    const { title,brand, description, quantity,price } = req.body;

    
    if (!title || !brand || !description || quantity < 0 || price < 0) {
      return res.status(400).json({ error: 'Invalid data provided' });
    }
    const newProduct = new product({
      title,
      brand,
      description,
      quantity,
      price
    });
    console.log('Note has been Added');

    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (error) {
    console.error({ error: error.message });
    res.status(500).send('internal server error');

  }
});

// Rote : 2  read all product "api/product2/read"
router.get('/read', async (req, res) => {
  try {
    // Retrieve all products from the database
    const allProducts = await product.find();

    // Send the list of products in the response
    res.json(allProducts);
  } catch (error) {
    console.error({ error: error.message });
    res.status(500).send('Internal server error');
  }
});


// Route:3 Update a product by ID "api/product2/update/:id"
router.put('/update/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      const { title,brand, description, quantity, price } = req.body;
  
      // Check if the product ID is provided
      if (!productId) {
        return res.status(400).json({ error: 'Product ID is required' });
      }
  
      // Check if the product ID is valid
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ error: 'Invalid product ID' });
      }
  
      // Find the product by ID and update its properties
      const updatedProduct = await product.findByIdAndUpdate(
        productId,
        {title, brand, description, quantity,price },
        { new: true } // Return the updated document
      );
  
      // Check if the product with the provided ID exists
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(updatedProduct);
      
    } catch (error) {
      console.error('Error while updating product:', error);
      res.status(500).send('Internal server error');
    }
  });

  
  // Route:4 Delete a product by ID "api/product2/delete/:id"
router.delete('/delete/:id', async (req, res) => {
    try {
      const productId = req.params.id;
  
      // Check if the product ID is provided
      if (!productId) {
        return res.status(400).json({ error: 'Product ID is required' });
      }
  
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ error: 'Invalid product ID' });
      }
  
      // Find the product by ID and delete it
      const deletedProduct = await product.findByIdAndRemove(productId);
  
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error while deleting product:', error);
      res.status(500).send('Internal server error');
    }
  });

module.exports = router;
