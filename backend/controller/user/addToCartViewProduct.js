const addToCartModel = require("../../models/cartProduct");


const addToCartViewProduct=async(req,res)=>{
        try{
              const currentUser=req.userId;
              const allProdcut=await addToCartModel.find({userId:currentUser}).populate("productId")

              res.json({
                  data:allProdcut,
                  success:true,
                  error:false
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

module.exports=addToCartViewProduct