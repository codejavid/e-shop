import Order from "../models/order.js";
import asyncHandler from "../middleware/asyncHandler.js";

// Create New Order
export const newOrder = asyncHandler(async (req, res, next) => {

  const {
    shippingInfo,
    orderItems,
    paymentMethod,
    paymentInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentMethod,
    paymentInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    user: req.user._id
  });

  res.status(201).json({
    success: true,
    order
  });

});