import asyncHandler from 'express-async-handler';
import User from '../model/User.model.js';
import Order from '../model/Order.model.js';
import Product from '../model/Product.model.js';
// 1
//@desc create orders
//@route POST /api/v1/orders
//@access private
export const createOrderCntrl = asyncHandler(async (req, res) => {
  // get the payload(customer,orderItem,shoippingAdress,totalPrice)
  const { orderItems, shippingAddress, totalPrice } = req.body;
  // find the user
  const user = await User.findById(req.userAuthId);
  // check if the user hasShipped address
  if (user?.hasShippingAddress) {
    throw new Error('Please provide shipping addresss');
  }
  if (orderItems?.length <= 0) {
    //   console.log(req.body);
    //    check if order is not empty
    throw new Error('No order Items');
  }
  // place/create order save into DB
  const order = await Order.create({
    user: user?._id,
    orderItems,
    shippingAddress,
    // totoalPrice
    totalPrice,
  });
  //   console.log(order);

  //   update the product QTY
  const products = await Product.find({ _id: { $in: orderItems } });
  console.log(products);
  orderItems?.map(async (order) => {
    console.log(order);
    const product = products?.find((product) => {
      return product?._id?.toString() === order?._id?.toString();
    });
    if (product) {
      product.totalSold += order.qty;
    }
    await product.save();
  });
  //   push order into user
  user.orders.push(order?.id);
  await user.save();
  //   make payment(stripe)
  //   payment webhook
  //   update the user order
  res.json({
    success: true,
    message: 'Order created',
    order,
    user,
  });
});
