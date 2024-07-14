const uploadProductPermission = require("../../helper/permission");
const productModel = require("../../models/productModel")

async function  uploadProductController(req,res){
         try{
          
          const sessionUserId=req.userId;
          
          if(uploadProductPermission(sessionUserId)){
               
            const uploadProduct=new productModel(req.body);
            const saveProduct=await uploadProduct.save();
            
            res.status(201).json({
                message:"Product Uploaded Successfully",
                data:saveProduct,
                error:false,
                success:true
            })
                 
          }

          else{
                throw new Error("Permission denied")
          }
          
          
         }

         catch(err){
            res.status(400).json({
                 message:err.message || err,
                 error:true,
                 success:false
            })
       } 
}

module.exports=uploadProductController