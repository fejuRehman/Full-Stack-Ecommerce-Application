const addToCartModel = require("../../models/cartProduct");

const deleteAddToCart=async (req,res)=>{
        try{
                const addToCartProductId=req?.body?._id;

                const deleteProduct=await addToCartModel.deleteOne({_id:addToCartProductId})

                res.json({
                        message: "Product deleted successfully",
                        error: false,
                        success: true,
                        data: deleteProduct
                      });
        }
        catch(err){
                res.status(400).json({
                     message:err.message || err,
                     error:true,
                     success:false
                })
           }
        
}

module.exports=deleteAddToCart