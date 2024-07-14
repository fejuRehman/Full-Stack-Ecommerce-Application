import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';

const AllProducts = () => {
  
  const[openUploadProduct,setOpenUploadProduct]=useState(false);
  
  const[allProduct,setAllProduct]=useState([]);

  const fetchAllProduct=async()=>{
            const response=await fetch(SummaryApi.allProduct.url);
            const dataResponse=await response.json();


            setAllProduct(dataResponse?.data || []);
            console.log("all-product",dataResponse);

  }
  
  useEffect(()=>{
      fetchAllProduct();
  },[])


  return (
    <div>
          <div className='bg-white py-2 px-4 flex justify-between items-center'>
               <h2 className='font-bold text-lg'>
                  All Product
               </h2>
               <button className='border-2 border-red-600 text-red-600 py-1 px-3 rounded-full hover:bg-red-600 hover:text-white transition-all'  onClick={() =>setOpenUploadProduct(true) } >Upload Product</button>
          </div>

         {/* all product  */}

          <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] justify-around overflow-y-scroll'>
               {
                   allProduct.map((product,index)=>{
                        return (
                            <AdminProductCard data={product} key={index+"allProduct"} fetchData={fetchAllProduct} />
                            
                        )
                   })
               }

          </div>



          {/* upload product component 
           i want when i click on button upload product then this page show */}
          {
            openUploadProduct && (
               <UploadProduct onClose={()=>setOpenUploadProduct(false)} fetchAllProduct={fetchAllProduct}/>
                
            )
          }

    </div>
  )
}

export default AllProducts
