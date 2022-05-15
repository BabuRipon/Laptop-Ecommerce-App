const Razorpay=require('razorpay');
const Cart=require('../models/cart');
const User=require('../models/user');

exports.createOrder=async(req,res)=>{
    const { coupon }=req.body;
    // console.log('coupon',coupon);
    // console.log(req.user);
    try {

        // 1 find user
        const user = await User.findOne({ email: req.user.email }).exec();
        // 2 get user cart total
        const { cartTotal, totalAfterDiscount } = await Cart.findOne({
            orderedBy: user._id,
        }).exec();

        let finalAmount = 0;

        if (coupon.coupon && totalAfterDiscount) {
            finalAmount = totalAfterDiscount * 100;
        } else {
            finalAmount = cartTotal * 100;
        }

        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });

    

        const options = {
            amount: finalAmount, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
        };

        const order = await instance.orders.create(options);
        if (!order) return res.status(500).send("Some error occured");

        res.json(order);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}