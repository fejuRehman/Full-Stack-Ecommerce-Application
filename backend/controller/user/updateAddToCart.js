const addToCartModel = require("../../models/cartProduct")

const updateAddToCartProduct=async (req,res)=>{
      try{
           const currentUserId=req.userId 
           const addToCartProductId=req.body._id   // this id is not a product id this is the id that is stored in add to cart model
           const qty=req.body.quantity

           const updateProduct=await addToCartModel.updateOne({ _id: addToCartProductId, userId: currentUserId },{
                ...(qty && {quantity : qty})
           })
          //  console.log("updateProduct",updateProduct)
           res.json({
                message: "Product updated",
                error:false,
                success:true,
                data:updateProduct
           })

      }
      catch(err){
        res.status(400).json({
             message:err.message || err,
             error:true,
             success:false
        })
   }
}

module.exports=updateAddToCartProduct