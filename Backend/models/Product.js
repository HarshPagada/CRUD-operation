const mongoose = require('mongoose')
const { Schema } = mongoose;

const ProductsSchema = new Schema({
    // user:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'user'
    // },
    // id: {
    //     type: Number,
    //     required: true
    // },
    title: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Product', ProductsSchema)
