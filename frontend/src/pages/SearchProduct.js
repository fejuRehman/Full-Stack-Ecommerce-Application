import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common';
import VerticalCard from '../components/VerticalCard';

const SearchProduct = () => {
  const [data,setData]=useState([])

  const query=useLocation()
  const [loading,setLoading]=useState(false)

  
  console.log("query",query.search);

  const fetchProduct=async ()=>{

       setLoading(true)
       const response=await fetch(SummaryApi.searchProduct.url+query.search)
       const responseData=await response.json();
       setLoading(false)

       setData(responseData.data)

      //  console.log("response" ,responseData)
  }

  useEffect(()=>{
       fetchProduct()
  },[query])

  return (
    <div className='container mx-auto p-4'>
         {
           loading && (
               <p className='text-lg text-center'>Loading....</p>
           )
         }   

         <p className='text-lg font-semibold my-3'>Search Results :{data.length}</p>
         {
            data.length===0 && !loading && (
                 <p className='bg-white text-lg text-center p-4'>No Product found</p>
            )
         }

         {
            data.length !==0 && !loading && (
                
           <VerticalCard loading={loading} data={data} />
                     
                
            )
         }
    </div>
  )
}

export default SearchProduct