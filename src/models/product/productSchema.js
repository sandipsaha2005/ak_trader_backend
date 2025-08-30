import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },
  subDescription: {
    type: String,
    required: true,
  },
  content:{
    type:String,
    required: true
  },
  image:{
    type: [String],
    required: true
  },
  category: { // for specific category (like watch, phones)
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  productCode: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
  isSale: {
    type: Boolean,
    default: false,
  },
  regularPrice: {
    type: Number,
    required: true,
  },
  salePrice: {
    type: Number,
    required: function() {
      return this.isSale; // salePrice is required only if isSale is true
    }
  },
  available: {
    type: Boolean,
    default: true,
  }, 
  addedBy:{
    required:true,
    type: String
  },
  hide:{
    type:Boolean,
    required:true,

  }
})




export const Product = mongoose.model("Product", productSchema)