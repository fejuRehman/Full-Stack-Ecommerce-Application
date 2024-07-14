const crypto = require('crypto');


const validateOrderController = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        // console.log("Received data:", razorpay_order_id, razorpay_payment_id, razorpay_signature);

        const sha = crypto.createHmac("sha256", "zWtzbYIT0QP4wDTb82x9dJWO");
        sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const digest = sha.digest("hex");

        // console.log("Computed digest:", digest);

        if (digest !== razorpay_signature) {
            console.log("Signature does not match!");
            return res.status(400).json({ msg: "Transaction is not legit!" });
        }

        // console.log("Signature matched!");

        res.json({
            message: "success",
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
        });
    } catch (err) {
        // console.error("Error:", err);
        res.status(500).send("Error");
    }
};


module.exports=validateOrderController