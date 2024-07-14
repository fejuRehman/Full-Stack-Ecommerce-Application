const orderModel = require("../../models/billingModel");

const fetchAllOrder = async (req, res) => {
  try {
    const orders = await orderModel.find();
    // console.log("order: ",orders);
    const orderDetails = orders.map((order) => ({
      _id: order._id,
      firstName: order.firstName,
      lastName: order.lastName,
      email: order.email,
      addressLine1: order.addressLine1,
      addressLine2: order.addressLine2,
      city: order.city,
      state: order.state,
      postalCode: order.postalCode,
      country: order.country,
      quantity: order.quantity,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      orderId: order.orderId,
      timestamp: order.timestamp,
    }));

    // console.log("orderdetails", orderDetails);
    res.json({
      data: orderDetails,
      message: "All orders retrieved successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || "An error occurred while fetching orders",
      error: true,
      success: false,
    });
  }
};

module.exports = fetchAllOrder;
