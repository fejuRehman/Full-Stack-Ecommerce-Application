const userModel = require("../../models/userModel");

async function updateUser(req,res){
        try{
           
            // this id coming from auth token it is the current user id
            const sessionUser=req.userId
            const {userId,name,email,role}=req.body;

          //   console.log("user from session: ",sessionUser);
          //   console.log("user from req.body: ",userId)
            
            const payload={
                 ...(email && {email : email}),
                 ...(name && {name : name}),
                 ...(role && {role : role}),
            }
            
            // check if current user is admin or not
            const user=await userModel.findById(sessionUser);

            console.log("user-role",user.role);

            const updateUser=await userModel.findByIdAndUpdate(userId,payload);

            res.json({
                 data:updateUser,
                 message:"User Updated",
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

module.exports=updateUser