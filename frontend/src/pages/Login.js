import React, { useContext, useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';
const Login = () => {


const [showPassword,setShowPassword]=useState(false);
  
 const [data,setData]=useState({
         email: "",
         password: ""
  })
  
   const {fetchUserDetails,fetchUserAddToCartCount}=useContext(Context);

 

  const handleOnChange= (e)=>{
        const {name,value}=e.target;

        setData((prev)=>{
               
          return {
                  ...prev,
                  [name]:value ,
                 
                 }
                
         })

  }
  
  const navigate=useNavigate();

  const handleOnSubmit=async(e)=>{
          e.preventDefault();
          
          const dataResponse=await fetch(SummaryApi.signIn.url,{
            credentials:"include",
            method:SummaryApi.signIn.method,
            headers:{
              "Content-Type" :"application/json"
            },
            body : JSON.stringify(data)
          })

          const dataApi=await dataResponse.json();
         //  console.log(dataApi.success);
         //  console.log(dataApi.error);

          if(dataApi.success){
            toast.success(dataApi.message); 
            navigate('/');
            // this calling is related to app page there is not use of this, this is used to fetch the details of user when user is loggged in
            fetchUserDetails();
            fetchUserAddToCartCount()
        }
        if(dataApi.error){
            toast.error(dataApi.message);
            console.log(dataApi.error);
        }
  }

//   console.log(data);

  return (
      <section id="login">
             <div className='container mx-auto p-4'>

                 <div className='bg-white p-5 py-5 w-full max-w-sm mx-auto'>
                       <div className='w-20 h-20 mx-auto'> 
                           <img src={loginIcons} alt="login icon" />
                       </div>

                        <form className='mt-5 flex flex-col gap-2' onSubmit={handleOnSubmit}>

                            <div className='grid'>
                                <label>Email: </label>
                                 <div className='bg-slate-100 p-2'>
                                    <input type='email'
                                      placeholder='Enter email'
                                      name='email'
                                      value={data.email}
                                      onChange={handleOnChange}
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

                                 <Link to={"/forgot-password"} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                                      Forgot Password ?
                                 </Link>
                            </div>

                             <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full mx-auto block hover:scale-110 hover:bg-red-700 transition-all mt-4'>Login</button>
                        </form>  
                        
                        <p className='my-5'>Don't have an account ? <Link to={'/sign-up'} className=' text-red-600 hover:text-red-700 hover:underline'>Sign Up</Link></p>
                </div>
                   

             </div>
      </section>
  )
}

export default Login