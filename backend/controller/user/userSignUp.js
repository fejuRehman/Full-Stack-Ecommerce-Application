const userModel = require("../../models/userModel");
const bcrypt = require('bcrypt');

async function userSignUpController(req,res){
      
      try{
          const{name,email,password}=req.body;
          
          console.log(req.body);
          
          const user=await userModel.findOne({email});
         
          // console.log("user" ,user);
          
          if(user){
               throw new Error("User Already  Exist ");
          }


          if(!name){
               throw new Error('please provide name');
          }
          if(!email){
               throw new Error('please provide email');
          }
          if(!password){
               throw new Error('please provide password');
          }
          
          // for this method go and check the npm bcrypt

          const saltRounds = 10;
          const myPlaintextPassword =password;
          const salt = bcrypt.genSaltSync(saltRounds);
          const hashPassword = await bcrypt.hashSync(myPlaintextPassword, salt);
 
          if(!hashPassword){
                 throw new error("something is wrong");
          }
          
          // overwriting the password 
          const payload={
                ...req.body,
                role:"GENERAL",       // here i am setting role to general for all the user
                password:hashPassword
          }

          const userData= new userModel(payload);
          //  i need to save this because i have created using new method

          const saveUser=await userData.save();
         
          res.status(201).json({
                data:saveUser,
                success:true,
                error:false,
                message:"User Created Successfully"
          })
                  
          
      }
      catch(err){
          //  console.log(err);
           res.json({
               message:err.message || err,
               error:true,
               success:false
           })
      }
}

module.exports=userSignUpController