import asyncHandler from 'express-async-handler';
import Product from '../model/Product.model.js';

// 1
// @desc CREATE NEW PRODUCT
// @route POST /api/v1/products
// @ access PRIVATE/ADMIN

export const createProductCtrl = asyncHandler(async (req, res) => {
  const { name, description, category, sizes, colors, price, totalQty, brand } =
    req.body;
  console.log(req);
  // product exists
  const productExists = await Product.findOne({ name });
  if (productExists) {
    throw new Error('Product Already exists');
  }
  //   create the product
  const product = await Product.create({
    name,
    description,
    category,
    sizes,
    colors,
    user: req.userAuthId,
    price,
    totalQty,
    brand,
  });
  //   push the product into category
  //   send response
  res.json({
    status: 'success',
    message: 'Product created successfully',
    product,
  });
});

// 2
// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProductsCntrl = asyncHandler(async (req, res) => {
  // const aux = await Product.find();
  // console.log(aux);
  // return the document
  console.log(req.query);
  let productQuery = Product.find({});
  // return the Query object with other fields also
  // console.log(productQuery);
  // searn by name if exist otherwise return the empty strig
  // 1-FILTER SEARCH BY NAME
  if (req.query.name) {
    productQuery = productQuery.find({
      name: { $regex: req.query.name, $options: 'i' },
    });
  }
  // 2- FILTER SEARCH BY BRAND
  if (req.query.brand) {
    productQuery = productQuery.find({
      brand: { $regex: req.query.brand, $options: 'i' },
    });
  }
  // 3-FILTER BY CATEGORY
  if (req.query.category) {
    productQuery = productQuery.find({
      category: { $regex: req.query.category, $options: 'i' },
    });
  }
  // 4- FILTER BY COLOR
  if (req.query.colors) {
    productQuery = productQuery.find({
      colors: { $regex: req.query.colors, $options: 'i' },
    });
  }
  // 5- FILTER BY SIZES
  if (req.query.sizes) {
    productQuery = productQuery.find({
      sizes: { $regex: req.query.sizes, $options: 'i' },
    });
  }
  // FILTER BY PRICE RANGE IN 100-400
  if (req.query.price) {
    const priceRange = req.query.price.split('-');
    // console.log(priceRange);
    // gte greater than or equal same lte lower

    productQuery = productQuery.find({
      price: { $gte: priceRange[0], $lte: priceRange[1] },
    });
  }

  // ignore the casing whether its upper or lower
  // await the query
  // put it below to the search by name otherwise it return  the products because if
  // statement is not run but this statement if run above it stores all the products
  // PAGINATION
  // PAGE
  const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
  // limit
  const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
  // startIndex
  const startIndex = (page - 1) * limit;
  // end Index
  const lastIndex = page * limit;
  // totoal
  const total = await Product.countDocuments();
  //
  productQuery = productQuery.skip(startIndex).limit(limit);
  const products = await productQuery;
  // pagination result
  const pagination = {};
  if (lastIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }
  res.json({
    status: 'success',
    total,
    results: products.length,
    pagination,
    message: 'Products fetched successfully',
    products,
  });
});

// 3
// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
export const getProductCntrl = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new Error('Product Not Found');
  }
  res.json({
    status: 'success',
    message: 'Product fetched successfullly',
    product,
  });
});

// 4
// @desc    update  product
// @route   PUT /api/products/:id/update
// @access  Private/Admin
export const updateProductCntrl = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    category,
    sizes,
    colors,
    user,
    price,
    totalQty,
    brand,
  } = req.body;
  // taking the field from the input
  // validation
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      category,
      sizes,
      colors,
      user,
      price,
      totalQty,
      brand,
    },
    { new: true, runValidators: true }
  );
  res.json({
    status: 'success',
    message: 'Product updated successfully',
    product,
  });
});

// 5
// @desc    delete  product
// @route   DELETE /api/products/:id/delete
// @access  Private/Admin
export const deleteProductCntrl = asyncHandler(async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({
    status: 'success',
    message: 'Product deleted successfully',
  });
});
