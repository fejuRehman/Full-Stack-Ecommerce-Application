const mongoose=require('mongoose')

const addToCartSchema= mongoose.Schema({
    productId : {
         ref: "product",
         type: String
    },
    userId:String,
    quantity:Number
    
},{timestamps:true})


const addToCartModel=mongoose.model('addToCart',addToCartSchema)

module.exports =addToCartModel