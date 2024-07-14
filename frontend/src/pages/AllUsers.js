import React, { useEffect, useState } from 'react'
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';
const AllUsers = () => {

  const [allUser,setAllUser]=useState([]);
  const [openUpdateRole,setOpenUpdateRole]=useState(false)
  const [updateUserDetails,setUpdateUserDetails]=useState({
        name : "",
        email: "",
        role : "",
        _id: ""
  })

  
  const fetchAllUsers=async ()=>{
         const fetchData=await fetch(SummaryApi.allUser.url,{
            method:SummaryApi.allUser.method,
            credentials:'include'
         })

         const dataResponse=await fetchData.json();

        //  console.log(dataResponse);
  
       
    if(dataResponse.success){
            setAllUser(dataResponse.data);
    }
    if(dataResponse.error){
          toast.error(dataResponse.message);
    }

  } 

  //  jab bhi page refresh hoga aur page mount hoga ye chlega
  useEffect(()=>{
       fetchAllUsers();
  },[])

  return (
    <div className='bg-white pb-4'>
         <table className='w-full userTable'>
             <thead>
                  <tr className='bg-black text-white'>
                        <th>Sr.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created Date</th>
                        <th>Action</th>
                  </tr>

             </thead>

             <tbody>
                 {
                    allUser.map((ele,index)=>{
                          return (
                           <tr key={index}>
                              <td>{index+1}</td>
                              <td>{ele?.name}</td>
                              <td>{ele?.email}</td>
                              <td>{ele?.role}</td>
                              <td>{moment(ele?.createdAt).format('LL')}</td>
                               <td>
                                   <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'
                                     onClick={()=>{
                                      setUpdateUserDetails(ele)
                                      setOpenUpdateRole(true)}
                                    }
                                     >
                                        <MdModeEdit/>
                                   </button>
                               </td>
                           </tr>
                           )
                    })
                 }
             </tbody>
         </table>

         {
           openUpdateRole && (
            <ChangeUserRole
            onClose={()=>setOpenUpdateRole(false)} 
            name={updateUserDetails.name} 
            email={updateUserDetails.email}
            role={updateUserDetails.role}
            userId={updateUserDetails._id} 
            callFun={fetchAllUsers} />
           )
         }
        

    </div>
  )
}

export default AllUsers