const addToCartModel = require("../../models/cartProduct");

const countAddToCartProduct=async (req,res)=>{
       try{
             const userId=req.userId;
             const count=await addToCartModel.countDocuments({userId});
          //    console.log(count);
             res.json({
                 data:count,
                 message:"got it",
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

module.exports=countAddToCartProduct