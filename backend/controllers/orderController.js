import Order from "../models/order.js";
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/product.js";
import order from "../models/order.js";

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

// Get order details =? /api/v1/orders/:id
export const getOrderDetails = asyncHandler(async (req, res, next) => {

  const order = await Order.findById(req.params.id);

  if(!order){
     return next(new ErrorHandler("No order found with id ID", 404));  
  }

  res.status(200).json({
    order
  });


});



// Get Current user orders => /api/v1/orders/me/orders
export const myOrders = asyncHandler(async (req, res, next) => {

  const orders = await Order.find({ user: req.user._id });


  res.status(200).json({
    orders
  });


});



// Get all orders => /api/v1/admin/orders
export const allOrders = asyncHandler(async (req, res, next) => {

  const orders = await Order.find();


  res.status(200).json({
    orders
  });


});


// Update orders => /api/v1/admin/orders/:id
export const updateOrders = asyncHandler(async (req, res, next) => {

  const order = await Order.findById(req.params.id);

  if(!order){
    return next(new ErrorHandler("No order found with id ID", 404));  
 }

 if(order.orderStatus === "Delivered"){
   return next(new ErrorHandler("You have already delivered this order", 400));  
 }

  order?.orderItems?.forEach(async (item) => {

    const product = await Product.findById(item?.product?.toString());

      if(!product){
        return next(new ErrorHandler("No product found with this ID", 404));  
      }

      product.stock = product.stock - item.quantity

      await product.save();

  })

 order.orderStatus = req.body.status;
 order.deliveredAt = Date.now();


  res.status(200).json({
    order
  });


});



// delete orders => /api/v1/admin/orders/:id
export const deleteOrder = asyncHandler(async (req, res, next) => {

  const order = await Order.findById(req.params.id);

  if(!order){
    return next(new ErrorHandler("No order found with id ID", 404));  
 }


 await order.deleteOne();

  res.status(200).json({
    success:true
  });


});

