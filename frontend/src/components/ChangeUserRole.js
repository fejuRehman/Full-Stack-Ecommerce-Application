import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoCloseSharp } from "react-icons/io5";
import SummaryApi from '../common';
import { toast } from 'react-toastify';


const ChangeUserRole = ({name,email,role,onClose,userId,callFun}) => {

   const [userRole,setUserRole]=useState(role);
   
   const handleOnChangeSelect=(e)=>{
           setUserRole(e.target.value);
           console.log(e.target.value);
    }
   
    const updateUserRole=async()=>{
           const fetchResponse=await fetch(SummaryApi.updateUser.url,{
                 method:SummaryApi.updateUser.method,
                 credentials:'include',
                 headers:{
                     "content-type": "application/json"
                 },
                 body:JSON.stringify({
                      userId:userId,
                      role:userRole
                 })
           })

           const responseData=await fetchResponse.json();

           if(responseData.success){
                toast.success(responseData.message);
                onClose();
                callFun()
           }
           console.log("role: updated: ",responseData);
    }


  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-50'>
         <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm' >
            
             <button className='ml-auto block' onClick={onClose}>
             <IoCloseSharp/>
             </button>

             <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>
             <p className=''>Name : {name}</p>

             <p>Email : {email}</p>
             
              <div className='flex justify-between items-center my-4'>
                    <p>Role :</p>
                    <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
                        {
                            Object.values(ROLE).map(ele=>{
                                return(
                                    <option value={ele} key={ele}>{ele} </option>
                                )
                            })
                        }
                    </select>
              </div>
              <button className='w-fit mx-auto block  py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700' onClick={updateUserRole}>Change Role</button>
            
         </div>
     </div>
  )
}

export default ChangeUserRole