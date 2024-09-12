import mongoose from 'mongoose';
import Product from '../model/product.model.js';
import cacheUtil from '../utility/cache.js';

export const getProducts = async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize) || 1000;
    const page = parseInt(req.query.page) || 1;

    // Create a unique Redis key based on page and pageSize
    const cacheKey = `products_page_${page}_size_${pageSize}`;

    const products = await cacheUtil.getOrSetKey(cacheKey, async () => {
      const data = await Product.find({})
        .limit(pageSize)
        .skip(pageSize * (page - 1));

      return data;
    });

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body; // user will send this data

  if (!product.name || !product.description) {
    return res.status(400).json({ success: false, message: 'Please provide all fields' });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error('Error in Create product:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;

  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'Invalid Product Id' });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'Invalid Product Id' });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Product deleted' });
  } catch (error) {
    console.log('error in deleting product:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const createManyProducts = async (req, res) => {
  const products = req.body; // expecting an array of products

  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ success: false, message: 'Please provide an array of products' });
  }

  // Validate each product in the array
  for (let product of products) {
    if (!product.name || !product.description) {
      return res.status(400).json({ success: false, message: 'Each product must have a name and description' });
    }
  }

  try {
    // Insert multiple products at once
    const newProducts = await Product.insertMany(products);
    res.status(201).json({ success: true, data: newProducts });
  } catch (error) {
    console.error('Error in creating products:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
