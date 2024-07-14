import React, { useState } from 'react'
import { IoClose } from "react-icons/io5"
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify';
const UploadProduct = ({onClose, fetchAllProduct}) => {

  const [data,setData]=useState({
        productName: "",
        brandName: "",
        category: "",
        productImage:[],
        description: "",
        price: "",
        sellingPrice: ""
  })
 
const [openFullScreenImage,setOpenFullScreenImage]=useState(false) 

const[fullScreenImage,setFullScreenImage]=useState("");


  const HandleOnChange=(e)=>{
           const {name,value}=e.target;

           setData((prev)=>{
                return {
                   ...prev,
                  [name] :value
                }
           })
  }

  const handleUploadProduct=async(e)=>{
        
        const file=e.target.files[0];                              
                             
        const uploadImageCloudinary=await uploadImage(file) 

        // console.log("upload image",uploadImageCloudinary);
        
        setData((prev)=>{
           return{ 
             ...prev,
             productImage : [...prev.productImage,uploadImageCloudinary.url]
           }
        })

  }
 
  const handleDeleteProductImage=async(index)=>{
          
          console.log("image index: ",index);
          const newProductImage=[...data.productImage];
          newProductImage.splice(index,1)

          setData((prev)=>{
            return{ 
              ...prev,
              productImage : [...newProductImage]
            }
         })
  }

  // upload product 
  const handleSubmit=async(e)=>{
        e.preventDefault();
        // console.log("data: ",data);
        const response =await fetch(SummaryApi.uploadProduct.url,{
             method:SummaryApi.uploadProduct.method,
             credentials:'include',
             headers : {
                'content-type' : 'application/json'
             },
             body: JSON.stringify(data)
        })
      
        const responseData=await response.json();
        console.log("dataResponse: ", responseData);

        if(responseData.success){
             toast.success(responseData.message);
            //  when product uploaded i want the form to be closed 
            onClose();
            fetchAllProduct()
        }

        if(responseData.error){
             toast.error(responseData.message);
        }

  }

  return (

     <div className='fixed w-full h-full bg-slate-200 bg-opacity-30 top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
       
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>

                  <div className='flex justify-between items-center pb-3'>

                       <h2 className='font-bold text-lg'>Upload Product</h2>

                       <div className='w-fit ml-auto text-2xl cursor-pointer hover:text-red-600' onClick={onClose}><IoClose /></div>

                  </div> 

                    <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>

                       <label htmlFor="productName">Product Name :</label>
                       <input type="text" 
                       id="productName"
                        placeholder=' Enter Product Name' 
                        value={data.productName} 
                        name='productName'
                        onChange={HandleOnChange}
                        className='bg-slate-100 p-2 border rounded'
                        required
                         />

                       <label htmlFor="brandName" className='mt-3'>Brand Name :</label>
                       <input type="text" 
                       id="brandName"
                        placeholder=' Enter Brand Name' 
                        value={data.brandName} 
                        name='brandName'
                        onChange={HandleOnChange}
                        className='bg-slate-100 p-2 border rounded'
                        required
                         />

                       <label htmlFor="category" className='mt-3'>Category :</label>
                       <select value={data.category} name="category" onChange={HandleOnChange} className='bg-slate-100 p-2 border rounded' required>
                             <option value={""}>Select Category</option>    {/*  by default it will be shown */}
                              {   
                                  productCategory.map((ele,index)=>{
                                        return(
                                            <option value={ele.value}  key={ele.value+index}>{ele.label}</option>
                                        )
                                  })
                              }
                             
                       </select>

                       <label htmlFor=" productImage" className='mt-3'> productImage :</label>
                       
                       {/* this label provided here because where ever click on the below space input should work */}
                       <label htmlFor="uploadImageInput">
                          <div  className='bg-slate-100 p-2 border rounded h-28 w-full flex justify-center items-center cursor-pointer'>
                                  <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                    <span className='text-4xl'> <FaCloudUploadAlt /></span>
                                      <p className='text-sm'>Upload Product Image</p>
                                      <input type="file" id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
                                  </div>
                          </div>
                       </label>
                        <div>
                             {
                               data?.productImage[0] ? (
                                  <div className='flex items-center gap-2'>
                                      {
                                         data.productImage.map((ele,index)=>{
                                          return (
                                             <div className='relative group'>
                                                  
                                                  <img src={ele}
                                                  alt={ele}
                                                  width={80} 
                                                  height={80} 
                                                  className='bg-slate-100 border rounded cursor-pointer' 
                                                  onClick={()=>{
                                                    setOpenFullScreenImage(true);
                                                    setFullScreenImage(ele);
                                                  }} />
                                                  <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={()=>handleDeleteProductImage(index)}>
                                                     <MdDelete />
                                                  </div>

                                             </div>
                                           
                                             
                                          )
                                      })
                                      }
                                  </div>
                               ):
                               (
                                  <p className='text-red-600 text-xm'>*Please upload product image</p>
                               )
                             }
                        </div>

                      <label htmlFor="price" className='mt-3'>Price :</label>
                       <input type="number" 
                        id="price"
                        placeholder=' Enter Price' 
                        value={data.price} 
                        name='price'
                        onChange={HandleOnChange}
                        className='bg-slate-100 p-2 border rounded'
                        required
                         />

                      <label htmlFor="sellingPrice" className='mt-3'>SellingPrice :</label>
                       <input type="number" 
                        id="sellingPrice"
                        placeholder=' Enter SellingPrice' 
                        value={data.sellingPrice} 
                        name='sellingPrice'
                        onChange={HandleOnChange}
                        className='bg-slate-100 p-2 border rounded'
                        required
                         />
                        
                      <label htmlFor="description" className='mt-3'>Description :</label>
                       <textarea 

                        name="description"
                        value={data.description}
                        id="description" 
                        className='h-28 bg-slate-100 border resize-none p-1'
                        onChange={HandleOnChange} rows={3} 
                        placeholder='Enter Product Description '>

                       </textarea>

                         <button className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'>Upload Product</button>   
                   </form> 



            </div>
            
            {/* display image full screen */}
            {
               openFullScreenImage && (
             <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
                 
               )
            }
          
     </div>
         
  )
}

export default UploadProduct