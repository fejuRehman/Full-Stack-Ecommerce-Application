const uploadProductPermission = require("../../helper/permission");
const productModel = require("../../models/productModel");



async function updateProductController(req,res){
           try{
            const sessionUserId=req.userId;
          
            if(uploadProductPermission(sessionUserId)){
                 
                 const {_id,...restBody}=req.body;
                //  console.log("id: ",_id);
                //  console.log("req body ",req.body);
                 const updateProduct=await productModel.findByIdAndUpdate(_id,restBody);

                //  console.log("update-product",updateProduct);
                 res.json({
                     message:"Product Updated Successfully",
                     data : updateProduct,
                     success : true,
                     error : false
                 })
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

module.exports=updateProductController