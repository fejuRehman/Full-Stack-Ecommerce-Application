import React, { useContext } from 'react'
import scrollTop from '../helpers/scrollTop';
import displayINRCurrency from '../helpers/displayCurrency';
import { Link } from 'react-router-dom';
import Context from '../context';
import addToCart from '../helpers/addToCart';

const VerticalCard = ({loading,data=[]}) => {

  const loadingList=new Array(13).fill(null);

  const {fetchUserAddToCartCount}=useContext(Context);

  const handleAddToCart=async(e,id)=>{
       await addToCart(e,id)
         fetchUserAddToCartCount()

  }
  return (
   <div className='grid grid-cols-[repeat(auto-fit,minmax(240px,260px))] justify-center md:justify-between gap-6 md:gap-5 overflow-scroll scrollbar-hidden transition-all mx-4'>        
     {  
      loading ? (
          loadingList.map((product,index)=>{
          
              return (
                  <div className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow '>
                      <div className='bg-slate-200 h-52 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
      
                      </div>

                      <div className='p-4 grid gap-3'>
                          <h2 className='font-semibold text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 bg-slate-200 w-full animate-pulse rounded-full'></h2>
                          <p className='capitalize text-slate-500 p-1  bg-slate-200 w-full animate-pulse rounded-full py-2'></p>
                          
                          <div className='flex gap-3'>
                              <p className='text-red-600 font-medium p-1  bg-slate-200 w-full animate-pulse rounded-full py-2'></p>
                              <p className='text-slate-500 line-through p-1  bg-slate-200 w-full animate-pulse rounded-full py-2'></p>
                          </div>
                          
                          
                          <button className='text-md text-white bg-slate-200 rounded-full cursor-pointer px-3 py-2 animate-pulse'></button>
                          
                          
                      </div> 
                  </div>
                  )
              })
      ):
      (
      data.map((product,index)=>{
          
          return (
              <Link  to={"/product/"+product?._id}  className='w-full min-w-[280px]  md:min-w-[300px] max-w-[270px] md:max-w-[290px]  bg-white rounded-sm shadow ' onClick={scrollTop}>
                  <div className='bg-slate-200 h-52 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                      <img src={product?.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all cursor-pointer mix-blend-multiply'/>
  
                  </div>

                  <div className='p-4 grid gap-3'>
                      <h2 className='font-semibold text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                      <p className='capitalize text-slate-500'>{product?.category}</p>
                      
                      <div className='flex gap-3'>
                          <p className='text-red-600 font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                          <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                      </div>
                      
                      
                      <button className='text-md bg-red-600 hover:bg-red-700 text-white rounded-full cursor-pointer px-3 py-1' onClick={(e)=>handleAddToCart(e,product._id)}>Add to Cart</button>
                      
                      
                  </div> 
              </Link>
              )
              })
          )
       
    }
   
    </div>
  )
}

export default VerticalCard