import React, { useContext, useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import SummaryApi from '../common'
import { FaStar } from "react-icons/fa6";
import { FaStarHalf } from "react-icons/fa";
import displayINRCurrency from '../helpers/displayCurrency';
import RecommendedProduct from '../components/RecommendedProduct';
import Context from '../context';
import addToCart from '../helpers/addToCart';

const ProductDetails = () => {

  const[data,setData]=useState({
    productName: "",
    brandName: "",
    category: "",
    productImage:[],
    description: "",
    price: "",
    sellingPrice: ""
  })
  
  const params=useParams();
  const[loading,setLoading]=useState(true);
  const productImageListLoading=new Array(4).fill(null);
  const [activeImage,setActiveImage]=useState("");
  const [zoomImageCoordinate,setZoomImageCoordinate]=useState({
       x : 0,
       y : 0
  })

  const [zoomImage,setZoomImage]=useState(false);


  const navigate=useNavigate()

  const fetchProductDetails=async ()=>{
           setLoading(true);
           const response=await fetch(SummaryApi.productDetails.url,{
                method:SummaryApi.productDetails.method,
                headers:{
                   "content-type": "application/json"
                },
                body:JSON.stringify({
                   productId:params?.id
                })
                   
                
           })

           setLoading(false);

           const dataResponse=await response.json();
          //  console.log("data",dataResponse)
           setData(dataResponse?.data);
           setActiveImage(dataResponse.data.productImage[0])
  }


  useEffect(()=>{
     fetchProductDetails();
  },[params])
  
  // now when i hover any image then the image will change for this 
  const handleMouseEnterProduct=(imageUrl)=>{
    setActiveImage(imageUrl)
       
  }

  const handleZoomImage = (e) => {
     setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect()

    const x = (e.clientX - left) /width
    const y = (e.clientY - top) /height

    setZoomImageCoordinate({ x, y })
   
    // console.log("coordinate", x, y)
  }

  const handleMouseLeave = () => {
    setZoomImage(false)
 }
 const {fetchUserAddToCartCount}=useContext(Context);

 const handleAddToCart=async(e,id)=>{
      await addToCart(e,id)
       fetchUserAddToCartCount()

 }

 const handleBuyProduct=async(e,id)=>{
      await addToCart(e,id)
      fetchUserAddToCartCount()
      navigate("/cart")

 }
 
  return (
    <div className='container mx-auto px-4'>
         <div className=' min-h-[200px] flex flex-col lg:flex-row gap-4'>

            {/* product image  */}
             <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>

               <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2 '>
                     <img src={activeImage} alt="img" className='h-full w-full object-scale-down mix-blend-multiply cursor-pointer' onMouseMove={handleZoomImage} onMouseLeave={handleMouseLeave}/>
                      
                      {/* product zoom  */}
                       {
                         zoomImage && (
                          <div className='hidden lg:block absolute min-w-[400px] min-h-[400px] overflow-hidden bg-slate-200 p-1 -right-[510px] top-0'>
                          <div className='w-full h-full min-w-[500px] min-h-[400px] mix-blend-multiply scale-125'
                           style={{
                              backgroundImage : `url(${activeImage})`,
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: `${zoomImageCoordinate.x *100}% ${zoomImageCoordinate.y *100}% `

                           }}
                           >
                             
                          </div>
                     </div>
                         )
                       }
                      
               </div>
                  <div className='h-full'>
                    {
                      loading ? (
                         
                         <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-hidden h-full'>
                          {
                             productImageListLoading.map((ele,index)=>{
                              return (
                                <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={index+"loadingImage"}>
                                     
                                </div>
                              )
                          })
                          }
                         </div>
                      ):
                      (
                        <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-hidden h-full'>
                          {
                             data?.productImage?.map((imageUrl,index)=>{
                              return (
                                <div className='h-20 w-20 p-1 bg-slate-200 rounded' key={imageUrl}>
                                    <img src={imageUrl} alt="img" className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={()=>handleMouseEnterProduct(imageUrl)} onClick={()=>handleMouseEnterProduct(imageUrl)}/>
                                </div>
                              )
                          })
                          }
                         </div>
                      )
                    }
                  </div>
             </div>

            {/* product details  */}

            <div>
               {
                 loading ? (
                  <div className='flex flex-col gap-2'>
                  <p className='bg-slate-200 animate-pulse px-2 rounded-full h-6 w-full'></p>
                  <h2 className='text-2xl lg:text-4xl font-medium bg-slate-200 animate-pulse h-6 rounded-full'></h2>
                  <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 rounded-full'></p>
             
                  {/* display rating  */}
                  <div className=' flex gap-1 bg-slate-200 animate-pulse h-6 rounded-full'>
                   
                    
                  </div>  

                  <div className='flex items-center gap-3 text-2xl lg:text-3xl font-medium '>
                     <p className='  bg-slate-200 animate-pulse'></p>
                     <p className='text-slate-400 line-through bg-slate-200 animate-pulse'></p>
                  </div>

                  <div className='flex items-center gap-3 my-2'>
                     <button className='border-2  rounded-full px-3 py-1 min-w-[120px] font-medium  bg-slate-200 animate-pulse h-6'></button>
                     <button className='border-2  rounded-full px-3 py-1 min-w-[120px]  font-medium text-white bg-slate-200 animate-pulse h-6'></button>
                  </div>

                  <div>
                      <p className='bg-slate-200 rounded-full animate-pulse font-medium h-6 my-1'> </p>
                      <p className='bg-slate-200 rounded animate-pulse h-12'></p>
                  </div>
             </div>
                 ):(
                  <div className='flex flex-col gap-2'>
                  <p className='bg-red-300 text-red-600 px-2 rounded-full w-fit'>{data?.brandName}</p>
                  <h2 className='text-2xl lg:text-4xl font-medium'>{data.productName}</h2>
                  <p className='capitalize text-slate-400'>{data.category}</p>
             
                  {/* display rating  */}
                  <div className='text-red-600 flex gap-1'>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStarHalf/>
                    
                  </div>  

                  <div className='flex items-center gap-3 text-2xl lg:text-3xl font-medium '>
                     <p className=' text-red-600'>{displayINRCurrency(data.sellingPrice)}</p>
                     <p className='text-slate-400 line-through'>{displayINRCurrency(data.price)}</p>
                  </div>

                  <div className='flex items-center gap-3 my-2'>
                     <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white' onClick={(e)=>handleBuyProduct(e,data?._id)}>Buy</button>
                     <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px]  font-medium text-white bg-red-600 hover:bg-white hover:text-red-600' onClick={(e)=>handleAddToCart(e,data?._id)}>Add To Cart</button>
                  </div>

                  <div>
                      <p className='text-slate-600 font-medium'>Description : </p>
                      <p>{data.description}</p>
                  </div>
             </div>
                 )
               }
            </div>

         </div>

         {
            data?.category && (
                <RecommendedProduct category={data?.category}heading={"Recommended Product"}  />
            )
         }
    </div>
  )
}

export default ProductDetails