import React, { useContext, useState } from "react";

import { GrSearch } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";
import logo from "../assest/Meesho_logo.png"

const Header = () => {
  const user=useSelector((state)=>state?.user?.user)            // console.log(user);
 
  const searchInput=useLocation()                               // console.log("search: ",searchInput)
  const URLsearch=new URLSearchParams(searchInput.search)       // console.log("urlsearch",URLsearch)
  const searchQuery=URLsearch.getAll("q")                       // console.log("searchquery: ",searchQuery);  
  const [search,setSearch]=useState(searchQuery)

 

  const dispatch=useDispatch();
  let navigate=useNavigate();


  const [menuDisplay,setMenuDisplay]=useState(false); // menu display h admin panel show krne k liye pehle isko false set kiya hua h jaise hi profile icon pr click hoga ye true ho jaayega aur show hoga
  const context=useContext(Context)
 
 const adminPanelHandler=()=>{    // iske ander false isliye set kr rhe h taaki ek baar click krne k baad disappear ho jaaye
    setMenuDisplay(false)
}

  
  const handleLogout=async ()=>{
       const fetchData=await fetch(SummaryApi.logout_user.url,{
            method:SummaryApi.logout_user.method,
            credentials:'include'
       })

       const data= await fetchData.json();

       if(data.success){
           toast.success(data.message);
           dispatch(setUserDetails(null));
           navigate('/')
       }

       if(data.error){
           toast.error(data.message);
       }

  }

  // here is i am handling input section

  const handleSearch= (e)=>{
         const{value}=e.target
         setSearch(value);
         if(value){
             navigate(`/search?q=${value}`)
         }
         else{
             navigate("/search")
         }

  }


  return (
    <header className="'h-16 shadow-md bg-white fixed w-full z-40">

       <div className="h-full container mx-auto flex items-center px-4 justify-between" >
           
           <div className="">
                <Link to={"/"} >
                   <img src={logo} width={60} height={10} className="p-2" />
                 
                </Link>
           </div>

            <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2' >
                 
                 <input type="text" placeholder="search product here... " className="w-full outline-none " onChange={handleSearch} value={search}/>
                 
                 <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
                       <GrSearch/>
                 </div>

           </div>


           <div className="flex items-center gap-6"> 
             
             <div className="relative  flex justify-center">
                 
                 {    // jiske paas user id h usi ko ye icon show hoga
                      user?._id && (
                        <div className="text-3xl cursor-pointer relative flex justify-center" onClick={()=>setMenuDisplay(prev => !prev)}>
                        {
                            user?.profilePic ? (
                                <img src={user?.profilePic} alt={user.name} className="w-10 h-10 rounded-full"/>
    
                            ):
                            (
                              <FaUserCircle />
                            )
                        }
                     
                      </div>
                      )
                 }

                

                  {
                     menuDisplay && (
                        <div className="absolute bg-white  bottom-0 top-10 h-fit p-2 shadow-lg rounded ">
                            <nav>
                                {
                                  user?.role===ROLE.ADMIN && (
                                // when i click on admin panel it should take me to show all product uploaded by that user   
                                  <Link to={"admin-panel/all-products"} className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2 " onClick={adminPanelHandler} >Admin Panel</Link>
                                    
                                  )
                                }
                            </nav>
                        </div>
                     )
                  }
                  
               
             </div>
              
             {
               user?._id && (
              <Link to={"/cart"} className="text-2xl relative cursor-pointer">
                  <span> <FaShoppingCart/> </span>
                 
                 <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-3 -right-3">
                     <p className="text-sm">{context.cartProductCount}</p>
                 </div>
              </Link>
                  
               )
             }

              <div >
                {
                  user?._id ?(
                      <button onClick={handleLogout} className="bg-red-600 px-2 py-1 rounded-full text-white hover:bg-red-700 mr-4 ">Logout</button>
                       
                  ):
                  (
                  <Link to={"/login"} className="bg-red-600 px-2 py-1 rounded-full text-white hover:bg-red-700 mr-4 ">Login</Link>
                     
                  )
                }
              </div>
          </div>
      </div>

    </header>
  );
};

export default Header;
