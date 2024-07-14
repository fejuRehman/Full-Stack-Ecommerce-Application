import React, { useEffect, useState } from 'react'
import SummaryApi from '../common';
import { Link } from 'react-router-dom';

const CategoryList = () => {

    const [categoryProduct,setCategoryProduct]=useState([]);
    // for loading purpose
    const[loading,setLoading]=useState(false);
    
    const categoryLoading=new Array(13).fill(null)

    const fetchCategoryProduct=async()=>{
           setLoading(true);
           const response=await fetch(SummaryApi.categoryProduct.url)
           const dataResponse=await response.json();
           setCategoryProduct(dataResponse.data);
           setLoading(false);

        //    console.log("data :" ,dataResponse);
    }

    useEffect(()=>{
          fetchCategoryProduct()
    },[])

  return (
    <div className='container mx-auto p-4'>
           
           {/* scrollbar-hidden class css writes in app.css  */}
           <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-hidden'>
           {

                 
                loading ? (
                                            
                    categoryLoading.map((ele,index)=>{
                        return(
                            <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading"+index}></div>
                        )
                    })
                

                ):
                
                categoryProduct.map((product,index)=>{
                       return(
                       
                        (
  
                        <Link to={"/product-category?category="+product?.category} className='cursor-pointer' key={product.category+index}>
                            <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                                <img src={product?.productImage[0]} alt={product?.category} className='h-full object-scale-down hover:scale-125 transition-all mix-blend-multiply' />
                               
                            </div>
                            <p className='text-center text-sm md:text-base capitalize'>{product.category}</p>
                        </Link>
                        )

                        
                       
                       )
                })
            }
           </div>
    </div>
  )
}

export default CategoryList