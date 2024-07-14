import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

// redux toolkit
// https://chatgpt.com/share/dfd46dda-7c4a-4291-a8eb-b8ad98107807

// context api
// https://chatgpt.com/share/43d6588d-0940-4e7e-8712-c40c4e29ef24


function App() {
  
  const dispatch=useDispatch();
  const [cartProductCount,setCartProductCount]=useState(0)
  const [cartData, setCartData] = useState([]);


  const fetchUserDetails=async()=>{
        const dataResponse=await fetch(SummaryApi.current_user.url,{
             method:SummaryApi.current_user.method,
             credentials:'include'    // it is used for sendind cookies to backend
        });

        const dataApi=await dataResponse.json();
       
       if(dataApi.success){
             dispatch(setUserDetails(dataApi.data));
       } 

        // console.log(dataApi);
  }

  const fetchCartData = async () => {
    try {
      const response = await fetch(SummaryApi.addToCartProductView.url, {
        method: SummaryApi.addToCartProductView.method,
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        }
      });
      const responseData = await response.json();
      if (responseData.success) {
        setCartData(responseData.data);
      }
    } catch (error) {
      console.error('Fetch cart data failed:', error);
    }
  };

  const fetchUserAddToCartCount=async ()=>{
    const dataResponse=await fetch(SummaryApi.addToCartProductCount.url,{
      method:SummaryApi.addToCartProductCount.method,
      credentials:'include'    // it is used for sendind cookies to backend
   });

    const dataApi=await dataResponse.json();
    setCartProductCount(dataApi?.data);
    // console.log("dataapi",dataApi);
   

  }

  useEffect(()=>{
        // user detail  everytime page refreshes this will work
      fetchUserDetails();
      // user addtocart count
      fetchUserAddToCartCount()
      fetchCartData();

  },[])


  return (  
    <>
       <Context.Provider value={{
           fetchUserDetails,
           cartProductCount,      // current user add to cart product count
           fetchUserAddToCartCount,
           cartData
      }}>

      <ToastContainer />

      <Header/>                           {/* it is placed above because we have to display header file in all pages  */}      
     
      <main className='min-h-[calc(100vh-120px)] pt-16'>
           <Outlet/>                               {/* Outlet is a special component provided by react-router-dom that renders the child route components based on the current URL path.  The use of react-router-dom’s Outlet allows for dynamic routing, where different components are displayed based on the URL path.*/} 
      </main>

      <Footer/>

      </Context.Provider>
      
    </>
  );
}

export default App;
