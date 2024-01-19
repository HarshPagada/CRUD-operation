const mongoose = require('mongoose');

const connectMongo = async()=>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/product');
        console.log('Connected to MongoDB');
      } catch (error) {
        console.error('Error connecting to MongoDB:', error);
      }
}

module.exports = connectMongo;