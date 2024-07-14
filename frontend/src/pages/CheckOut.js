import React, { useContext, useState } from 'react';
import Context from '../context';
import displayINRCurrency from '../helpers/displayCurrency';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { useSelector } from 'react-redux';

const CheckOut = () => {
    const user=useSelector((state)=>state?.user?.user)
    // console.log("user",user)
    const navigate = useNavigate();
   
    const [billingDetails, setBillingDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
    });
    const [loading, setLoading] = useState(false);

    const { cartData } = useContext(Context);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBillingDetails({
            ...billingDetails,
            [name]: value,
        });
    };

    const totalQty = cartData.reduce((prev, curr) => prev + curr.quantity, 0);
    const totalPrice = cartData.reduce((prev, curr) => prev + (curr.quantity * curr?.productId?.sellingPrice), 0);
    
     

    const validateBillingDetails = () => {
        const { firstName, lastName, email, addressLine1, city, state, postalCode, country } = billingDetails;
        return firstName && lastName && email && addressLine1 && city && state && postalCode && country;
    };

    const paymentHandler = async (e) => {
        e.preventDefault();

        if (!validateBillingDetails()) {
            toast.error("Please fill out all required billing details.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(SummaryApi.payment.url, {
                method: SummaryApi.payment.method,
                body: JSON.stringify({
                    amount: totalPrice * 100,
                    currency: "INR",
                    receipt: `receipt_${Date.now()}`,

                    // here including billing details
                    firstName: billingDetails.firstName,
                    lastName: billingDetails.lastName,
                    email: billingDetails.email,
                    addressLine1: billingDetails.addressLine1,
                    addressLine2: billingDetails.addressLine2,
                    city: billingDetails.city,
                    state: billingDetails.state,
                    postalCode: billingDetails.postalCode,
                    country: billingDetails.country,
                    quantity:totalQty,
                    productDetails: cartData

                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Failed to create order. Please try again.");
            }

            const order = await response.json();
            
            // console.log("order --> ", order);

            const options = {
                key: "rzp_test_l3Xv8LqFZBOiO4",
                amount: totalPrice * 100,
                currency: "INR",
                name: "ShopEase",
                description: "Test Transaction",
                image: "https://example.com/your_logo",
                order_id: order.order.id,
                handler: async function (response) {
                    const body = {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature
                    };

                    const validateRes = await fetch(SummaryApi.paymentValidate.url, {
                        method: SummaryApi.paymentValidate.method,
                        body: JSON.stringify(body),
                        headers: {
                            "Content-Type": "application/json"
                        },
                    });
                    

                    if (!validateRes.ok) {
                        throw new Error("Payment validation failed. Please contact support.");
                    }

                    const jsonRes = await validateRes.json();
                    // console.log("jsonResponse --> ", jsonRes);
                    if(jsonRes.success){
                          
                        toast.success("Payment Successful");
                    }

                    
                        navigate(`/order/${user._id}`, {
                           state:order.orderDetails
                    });
                  
                    
                },
                prefill: {
                    name: billingDetails.firstName + " " + billingDetails.lastName,
                    email: billingDetails.email,
                    contact: "9000890899"
                },
                notes: {
                    address: billingDetails.addressLine1
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.on('payment.failed', function (response) {
                toast.error("Payment failed. Please try again.");
                console.error(response.error);
            });
            rzp1.open();

        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="py-12 bg-gray-100">
            <div className="container mx-auto px-4">
                <form className="max-w-6xl mx-auto" onSubmit={paymentHandler}>
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full md:w-8/12 px-4 mb-8">
                            <h2 className="text-2xl font-bold mb-8">BILLING ADDRESS</h2>
                            <div className="flex flex-wrap -mx-4">
                                <div className="w-full md:w-1/3 px-4 mb-6">
                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={billingDetails.firstName}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                            placeholder="John"
                                        />
                                    </div>
                                </div>
                                <div className="w-full md:w-1/3 px-4 mb-6">
                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={billingDetails.lastName}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>
                                <div className="w-full md:w-1/3 px-4 mb-6">
                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={billingDetails.email}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                            placeholder="john@gmail.com"
                                        />
                                    </div>
                                </div>
                                <div className="w-full px-4 mb-6">
                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 1</label>
                                        <input
                                            type="text"
                                            name="addressLine1"
                                            value={billingDetails.addressLine1}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                            placeholder="123 Main St"
                                        />
                                    </div>
                                </div>
                                <div className="w-full px-4 mb-6">
                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 2</label>
                                        <input
                                            type="text"
                                            name="addressLine2"
                                            value={billingDetails.addressLine2}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                            placeholder="Apt, Suite, etc."
                                        />
                                    </div>
                                </div>
                                <div className="w-full md:w-1/3 px-4 mb-6">
                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={billingDetails.city}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                            placeholder="New York"
                                        />
                                    </div>
                                </div>
                                <div className="w-full md:w-1/3 px-4 mb-6">
                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={billingDetails.state}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                            placeholder="NY"
                                        />
                                    </div>
                                </div>
                                <div className="w-full md:w-1/3 px-4 mb-6">
                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                                        <input
                                            type="text"
                                            name="postalCode"
                                            value={billingDetails.postalCode}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                            placeholder="10001"
                                        />
                                    </div>
                                </div>
                                <div className="w-full px-4 mb-6">
                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                                        <input
                                            type="text"
                                            name="country"
                                            value={billingDetails.country}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                            placeholder="USA"
                                        />
                                    </div>
                                </div>
                                <div className="w-full px-4 mb-6">
                                    <button
                                        type="submit"
                                        className={`w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                                        disabled={loading}
                                    >
                                        {loading ? "Processing..." : "Proceed to Payment"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Cart Summary Sidebar */}
                        <div className="w-full md:w-4/12 px-4 mb-8">
                            <h2 className="text-2xl font-bold mb-8">CART SUMMARY</h2>
                            <div className="bg-white p-4 rounded-md shadow-md">
                                {cartData.map((item) => (
                                    <div key={item._id} className="flex justify-between items-center mb-4">
                                        <div className="flex items-center">
                                            <img src={item.productId.productImage[0]} alt={item.productId.productName} className="w-16 h-16 object-cover rounded-md" />
                                            <div className="ml-4">
                                                <p className="text-lg font-semibold">{item.productId.productName}</p>
                                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <div className="text-lg font-semibold text-gray-700">
                                            {displayINRCurrency(item.productId.sellingPrice * item.quantity)}
                                        </div>
                                    </div>
                                ))}
                                <div className="border-t border-gray-300 pt-4 mt-4">
                                    <div className="flex justify-between items-center">
                                        <p className="text-lg font-semibold">Total Quantity:</p>
                                        <p className="text-lg font-semibold">{totalQty}</p>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <p className="text-lg font-semibold">Total Price:</p>
                                        <p className="text-lg font-semibold text-gray-700">{displayINRCurrency(totalPrice)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default CheckOut;
