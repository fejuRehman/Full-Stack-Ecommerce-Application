const Razorpay = require("razorpay");
const orderModel = require("../../models/billingModel");

const orderController=async(req,res)=>{
    try {
        const currentUser=req.userId

        const razorpay = new Razorpay({
            key_id: process.env.Razorpay_Key_Id,
            key_secret: process.env.Razor_Pay_Secret_Key
        });
        
        const { amount, currency, receipt, firstName, lastName, email, addressLine1, addressLine2, city, state, postalCode, country,quantity, productDetails
        } = req.body;
        const options = {
            amount,
            currency,
            receipt,
        };
        const order = await razorpay.orders.create(options)

        if (!order) {
            return res.status(500).send("Error creating order")
        }
        const newOrder = new orderModel({
            amount:amount/100,
            currency,
            receipt,
            firstName,
            lastName,
            email,
            addressLine1,
            addressLine2,
            city,
            state,
            postalCode,
            country,
            quantity,
            orderId:order.id,
            productDetails

        });

       const orderDetails= await newOrder.save();
       res.json({
            order:order,
            orderDetails:orderDetails,
            message:"order created and stored successfully",
            error:false,
            success:true
       })
        // console.log("order",order);

    }catch(err){
        res.status(400).json({
             message:err.message || err,
             error:true,
             success:false
        })
   }
}

module.exports=orderController