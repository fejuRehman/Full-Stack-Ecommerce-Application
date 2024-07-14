import React, { useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common/index';
import { toast } from 'react-toastify';
const SignUp = () => {

const [showPassword,setShowPassword]=useState(false);
const [confirmPassword, setConfrirmPassword]=useState(false);
  
 const [data,setData]=useState({
         email: "",
         password: "",
         name: "",
         confirmPassword: "",
         profilePic: ""
  })
  
  const navigate=useNavigate();

  const handleOnChange= (e)=>{
         const {name,value}=e.target;

        setData((prev)=>{
               
          return {
                  ...prev,
                  [name]:value ,
                 
                 }
                
         })

  }
  
  const handleOnSubmit=async(e)=>{
          e.preventDefault();
          // console.log(data); 
          
          // api will only call when password and confirm password matches 
          if(data.password===data.confirmPassword){
               const dataResponse=await fetch(SummaryApi.signUP.url,{
                      method:SummaryApi.signUP.method,
                      headers:{
                        "Content-Type" :"application/json"
                      },
                      body : JSON.stringify(data)
                 })
          

          const dataApi=await dataResponse.json();
          
          if(dataApi.success){
              toast.success(dataApi.message);
              navigate("/login")
          }
          if(dataApi.error){
              toast.error(dataApi.message);
          }
         

          console.log(dataApi);  
      }

      else{
         toast.error("Please check Password and Confirm Password")
      }      
  }
 
  const handleUploadPic=(e)=>{
    // console.log(e.target.files);
     const file=e.target.files[0]
     console.log(file);
          setData((prev)=>{
               return {
                   ...prev,profilePic:URL.createObjectURL(file)
               }
          }) 
  }
//   console.log(data);

  return (
      <section id="login">
             <div className='container mx-auto p-4'>

                 <div className='bg-white p-5 py-5 w-full max-w-sm mx-auto '>
                       <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'> 
                            
                            <div>
                              <img src={data.profilePic || loginIcons} alt="login icon" />
                                 
                            </div>
          
                            <form>
                                <label>
                                    <div className='bg-slate-200 bg-opacity-80 text-center text-xs pb-4 pt-2 absolute bottom-0 w-full cursor-pointer'>
                                      Upload Photo
                                    </div>
                                    <input type='file' className='hidden' onChange={handleUploadPic}></input>
                                </label>
                            </form>
                       </div>

                        <form className='mt-5 flex flex-col gap-2'  onSubmit={handleOnSubmit}>

                            <div className='grid'>
                                <label>Name: </label>
                                 <div className='bg-slate-100 p-2'>
                                    <input type='text'
                                      placeholder='Enter your name'
                                      name='name'
                                      value={data.name}
                                      onChange={handleOnChange}
                                      required
                                      className='w-full h-full outline-none bg-transparent'>
                                       </input>
                                 </div>

                            </div>
                            <div className='grid'>
                                <label>Email: </label>
                                 <div className='bg-slate-100 p-2'>
                                    <input type='email'
                                      placeholder='Enter email'
                                      name='email'
                                      value={data.email}
                                      onChange={handleOnChange}
                                      required
                                      className='w-full h-full outline-none bg-transparent'>
                                       </input>
                                 </div>

                            </div>

                            <div >
                                <label>Password: </label>
                                 <div className='bg-slate-100 p-2 flex'>
                                   <input type ={showPassword ? "text":'password'}
                                      placeholder='Enter password' 
                                      name="password"
                                      value={data.password}
                                      onChange={handleOnChange}
                                      required
                                      className='w-full h-full outline-none bg-transparent'></input>
                                   <div>
                                      <span className='cursor-pointer text-lg' onClick={()=>{
                                                setShowPassword(prev =>!prev)
                                          }
                                      }>
                                          {
                                             showPassword ? (
                                                <FaEyeSlash/>
                                             )
                                             :(
                                                <FaEye />
                                             )
                                          }
                                         
                                          
                                      </span>
                                   </div>

                                 </div>

                                
                            </div>

                            <div >
                                <label>Confirm Password: </label>
                                 <div className='bg-slate-100 p-2 flex'>
                                   <input type ={ confirmPassword ? "text":'password'}
                                      placeholder='Enter confirm password' 
                                      name="confirmPassword"
                                      value={data.confirmPassword}
                                      onChange={handleOnChange}
                                      required
                                      className='w-full h-full outline-none bg-transparent'></input>
                                   <div>
                                      <span className='cursor-pointer text-lg' onClick={()=>{
                                                 setConfrirmPassword(prev =>!prev)
                                          }
                                      }>
                                          {
                                             confirmPassword ? (
                                                <FaEyeSlash/>
                                             )
                                             :(
                                                <FaEye />
                                             )
                                          }
                                         
                                          
                                      </span>
                                   </div>

                                 </div>

                                
                            </div>

                             <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full mx-auto block hover:scale-110 hover:bg-red-700 transition-all mt-4'>SignUp</button>
                        </form>  
                        
                        <p className='my-5'>Already have an account ? <Link to={'/login'} className=' text-red-600 hover:text-red-700 hover:underline'>Login</Link></p>
                </div>
                   

             </div>
      </section>
  )
}

export default SignUp