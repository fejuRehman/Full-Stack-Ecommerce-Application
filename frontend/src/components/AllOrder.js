import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import displayINRCurrency from '../helpers/displayCurrency';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch(SummaryApi.allOrder.url);
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            const responseData = await response.json();
            setOrders(responseData.data || []);
            console.log("order details", responseData);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            <div className="table-container max-h-[calc(100vh-190px)] max-w-[calc(90vw-200px)] overflow-y-auto overflow-x-auto scrollbar-hidden">
                <table className="w-full bg-white border border-gray-200 rounded-md shadow-md">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border-b border-gray-200">Order ID</th>
                            <th className="py-2 px-4 border-b border-gray-200">Customer</th>
                            <th className="py-2 px-4 border-b border-gray-200">Email</th>
                            <th className="py-2 px-4 border-b border-gray-200">Address</th>
                            <th className="py-2 px-4 border-b border-gray-200">City</th>
                            <th className="py-2 px-4 border-b border-gray-200">State</th>
                            <th className="py-2 px-4 border-b border-gray-200">Postal Code</th>
                            <th className="py-2 px-4 border-b border-gray-200">Country</th>
                            <th className="py-2 px-4 border-b border-gray-200">Quantity</th>
                            <th className="py-2 px-4 border-b border-gray-200">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b border-gray-200">{order.orderId}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{order.firstName} {order.lastName}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{order.email}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{order.addressLine1} {order.addressLine2}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{order.city}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{order.state}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{order.postalCode}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{order.country}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{order.quantity}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{displayINRCurrency(order.amount)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminOrders;
