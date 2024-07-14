import React, { useEffect, useState } from 'react'
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import image1 from '../assest/banner/img1.webp'
import image2 from '../assest/banner/img2.webp'
import image3 from '../assest/banner/img3.jpg'
import image4 from '../assest/banner/img4.jpg'
import image5 from '../assest/banner/img5.webp'

import image1Mobile from '../assest/banner/img1_mobile.jpg'
import image2Mobile from '../assest/banner/img2_mobile.webp'
import image3Mobile from '../assest/banner/img3_mobile.jpg'
import image4Mobile from '../assest/banner/img4_mobile.jpg'
import image5Mobile from '../assest/banner/img5_mobile.png'

const BannerProduct = () => {
  
  const [currImage,setCurrImage]=useState(0);

   const desktopImages=[
       image1,
       image2,
       image3,
       image4,
       image5,
       
   ]
   const mobileImages=[
       image1Mobile,
       image2Mobile,
       image3Mobile,
       image4Mobile,
       image5Mobile,   
   ]
   
   const nextImage=()=>{
      if(desktopImages.length-1 > currImage){
           setCurrImage((prev)=>prev+1)
      }
   }

   const prevImage=()=>{
      if(currImage>=0){
           setCurrImage((prev)=>prev-1)
      }
   }

   useEffect(() => {
    const interval = setInterval(() => {
      setCurrImage((prev) => (desktopImages.length - 1 > prev ? prev + 1 : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, [desktopImages.length]);


  return (
    <div className='container mx-auto rounded px-6'>
         <div className='h-56 md:h-72 w-full bg-slate-200 relative'>
              
              <div className='absolute z-10 w-full h-full md:flex items-center hidden'>
                   
                   <div className='flex justify-between w-full text-2xl'>
                        <button onClick={prevImage} className='bg-white shadow-md rounded-full p-1 '> <FaAngleLeft/></button>
                        <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1 '> <FaAngleRight/></button>
                   </div>

              </div>

              {/* destop and tablet version  */}
              <div className='hidden md:flex w-full h-full overflow-hidden'>
                  {
                      desktopImages.map((imageUrl,index)=>{
                              return (
                                    <div className='w-full h-full min-w-full min-h-full transition-all' key={imageUrl} style={{transform : `translateX(-${currImage*100}%)`}} >
                                        <img src={imageUrl} alt={index} className='w-full h-full'/>
                                    </div>
                              )
                      })
                      
                    }
            
              </div>
              {/* mobile version  */}
              <div className='flex w-full h-full overflow-hidden md:hidden'>
                  {
                      mobileImages.map((imageUrl,index)=>{
                              return (
                                    <div className='w-full h-full min-w-full min-h-full transition-all' key={imageUrl} style={{transform : `translateX(-${currImage*100}%)`}} >
                                        <img src={imageUrl} alt={index} className='w-full h-full object-cover'/>
                                    </div>
                              )
                      })
                      
                    }
            
              </div>

         </div>
    </div>
  )
}

export default BannerProduct