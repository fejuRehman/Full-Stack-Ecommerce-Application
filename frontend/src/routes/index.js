import React from 'react';
import { createBrowserRouter } from 'react-router-dom'
import App from '../App' 
import Home from '../pages/Home';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import SignUp from '../pages/SignUp';
import AdminPanel from '../pages/AdminPanel';
import AllUsers from '../pages/AllUsers';
import  AllProducts  from '../pages/AllProducts';
import CategoryProduct from '../pages/CategoryProduct';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import SearchProduct from '../pages/SearchProduct';
import CheckOut from '../pages/CheckOut';
import OrderConfirmation from '../pages/OrderConfirmation';
import AdminOrders from '../components/AllOrder';






// createBrowserRouter is a function provided by react-router-dom that helps create a router configuration.
const router = createBrowserRouter([
    {
      path: "/",         // this is a root route 
      element: <App/>,  // this root route render app component
      children: [       // inside the app we have home component
         {
           path:"",
           element:<Home/>
         },
         {
           path:"login",
           element:<Login/>
         },
         {
           path:"forgot-password",
           element:<ForgotPassword/>
         },
         {
            path:"sign-up",
            element:<SignUp/>
          },
          
          {
             path:"product-category",
             element:<CategoryProduct/>
          },

          {
             path:"product/:id",
             element:<ProductDetails/>
          },
          {
             path:"cart",
             element: <Cart/>
          },
          {
             path:"search",
             element: <SearchProduct/>
          },

          {  path:"checkout",
             element: <CheckOut/> 
          },

          {  path: "order/:orderId",
             element: <OrderConfirmation/>
          },
          

          {
            path:"admin-panel",
            element:<AdminPanel/>,

          children:[
          {
            path:"all-users",
            element:<AllUsers/>
          },

          {
            path:"all-products",
            element:<AllProducts/>
          },

          {
            path:"all-order",
            element:<AdminOrders/>
          },
          
            ]

          },
         



      ]
       
    },
   
  ]);

export default router;
