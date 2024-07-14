import React, { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import displayINRCurrency from '../helpers/displayCurrency';
import { useReactToPrint } from 'react-to-print';

const OrderConfirmation = () => {
    const location = useLocation();
    const orderDetails = location.state || {};
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Order_Confirmation',
    });

    console.log(orderDetails);

    if (!orderDetails || Object.keys(orderDetails).length === 0) {
        return <p>Order details not found.</p>;
    }

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        });
    };

    return (
        <section className="py-4 bg-gray-100 min-h-screen flex items-center">
            <div className="container mx-auto px-4">
                <div className="flex justify-center mb-4">
                    <button
                        onClick={handlePrint}
                        className="bg-red-600 text-white px-3 py-1 rounded-md shadow-md hover:bg-red-700"
                    >
                        Download PDF
                    </button>
                </div>
                <div className="max-w-4xl mx-auto bg-white p-4 rounded-md shadow-md" ref={componentRef}>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-2xl font-bold text-gray-800">ShopEase</div>
                        <div className="text-right">
                            <p className="text-sm font-semibold">Billing Address:</p>
                            <div className="text-gray-700 text-sm">
                                <p>{orderDetails?.firstName} {orderDetails?.lastName}</p>
                                <p>{orderDetails?.email}</p>
                                <p>{orderDetails?.addressLine1}</p>
                                <p>{orderDetails?.addressLine2}</p>
                                <p>{orderDetails?.city}, {orderDetails?.state}</p>
                                <p>{orderDetails?.postalCode}, {orderDetails?.country}</p>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="mb-4">
                        <p className="text-sm font-semibold mb-2">Order Summary</p>
                        <div className="text-gray-700 text-sm mb-2">
                            <p><span className="font-semibold">Order ID:</span> {orderDetails?.orderId}</p>
                            <p><span className="font-semibold">Order Date:</span> {formatTimestamp(orderDetails?.timestamp)}</p>
                            <p><span className="font-semibold">Total Amount:</span> {displayINRCurrency(orderDetails?.amount)}</p>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="mb-4">
                        <p className="text-sm font-semibold mb-2">Product Details</p>
                        <div className="text-gray-700 text-sm">
                            {orderDetails?.productDetails.map((product, index) => (
                                <div key={index} className="mb-2 p-2 border-b border-gray-300 flex">
                                    <div className="w-1/12">
                                        {product.productId.productImage && product.productId.productImage.length > 0 ? (
                                            <img
                                                src={product.productId.productImage[0]}
                                                alt={product.productId.productName}
                                                className="w-full h-auto"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = 'fallback-image-url'; // Provide a fallback image URL if the original one fails to load
                                                }}
                                            />
                                        ) : (
                                            <p className="text-xs">No image</p>
                                        )}
                                    </div>
                                    <div className="w-11/12 pl-2">
                                        <p><span className="font-semibold">Product Name:</span> {product.productId.productName}</p>
                                        <p><span className="font-semibold">Quantity:</span> {product.quantity}</p>
                                        <p><span className="font-semibold">Price:</span> {displayINRCurrency(product.productId.sellingPrice)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-right">
                        <p className="text-sm font-semibold">Total Amount: {displayINRCurrency(orderDetails?.amount)}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrderConfirmation;