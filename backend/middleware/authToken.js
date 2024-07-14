
const jwt=require('jsonwebtoken');
async function authToken(req,res,next){
     try{
           const token=req.cookies?.token
           
           if(!token) {
                return res.status(200.).json({
                     message:"Please Login...!",
                     success:false,
                     error:true
                })
           }
          jwt.verify(token,process.env.TOKEN_SECRET_KEY, function(err, decoded) {
               // console.log("decoded: ",decoded) // bar

                if(err){
                     console.log("auth err: ",err);
                    }
                 
               //   console.log(req.user);
                 req.userId=decoded?._id
                 next();


             });


          
     }

     catch(err){
        res.status(400).json({
            message:err.message || err,
            data:[],
            error:true,
            success:false
       })
     }
}

module.exports=authToken;