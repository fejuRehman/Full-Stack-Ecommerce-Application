const express = require('express');
const router = express.Router();


// Require controllers
const userSignUpController = require('../controller/user/userSignUp');
const userSignInController = require('../controller/user/userSignIn');
const userDetailsController = require('../controller/user/userDetail');
const authToken = require('../middleware/authToken');
const userLogout = require('../controller/user/userLogout');
const allUsers = require('../controller/user/allUsers');
const updateUser = require('../controller/user/updateUser');
const uploadProductController = require('../controller/product/uploadProduct');
const getProductController = require('../controller/product/getProduct');
const updateProductController = require('../controller/product/updateProduct');
const getSingleCategoryProduct = require('../controller/product/getSingleCategoryProduct');
const getCategoryWiseProduct = require('../controller/product/getCategorywiseProduct');
const getProductDetails = require('../controller/product/getProductDetails');
const addToCartController = require('../controller/user/addToCart');
const countAddToCartProduct = require('../controller/user/countAddToCartProduct');
const addToCartViewProduct = require('../controller/user/addToCartViewProduct');
const updateAddToCartProduct = require('../controller/user/updateAddToCart');
const deleteAddToCart = require('../controller/user/deleteAddToCartProduct');
const SearchProduct = require('../controller/product/searchProduct');
const filterProductController = require('../controller/product/filterProduct');

const orderController = require('../controller/payment/order');
const validateOrderController = require('../controller/payment/validateOrder');
const fetchAllOrder = require('../controller/payment/getAllOrder');

// Define routes
router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);


// Admin panel
router.get('/all-user', authToken, allUsers);
router.post('/update-user', authToken, updateUser);


//  product 
router.post('/upload-product', authToken, uploadProductController);
router.get('/get-product', getProductController);
router.post('/update-product', authToken, updateProductController);
router.get('/get-category',getSingleCategoryProduct);
router.post('/category-product',getCategoryWiseProduct)
router.post('/product-details',getProductDetails)
router.get("/search",SearchProduct)
router.post("/filter-product",filterProductController)


// user add to cart
router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-cart-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCart)


//payment and order
router.post("/order",orderController)
router.post("/order/validate",validateOrderController)
router.get("/all-order",fetchAllOrder)





module.exports = router;
