import { ImageUploadUtils } from "../../helpers/cloudinary.js";
import Product from "../../models/Product.js";

export const handleImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await ImageUploadUtils(url);
    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

// add ( Post ) products

export const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const newlyCreateProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });
    console.log("newlyCreateProduct from back", newlyCreateProduct);
    await newlyCreateProduct.save();

    res.status(201).json({
      success: true,
      message: "Products Added",
      data: newlyCreateProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

// fetch ( Get ) All Products

export const getAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(201).json({
      success: true,
      message: "Products Received",
      data: listOfProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

// Edit ( Update ) Products

export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const findProduct = await Product.findById(id);
    if (!findProduct) {
      res.status(404).json({
        success: false,
        message: "Product not found ",
      });
    }
    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;
    await findProduct.save();
    res.status(201).json({
      success: true,
      message: "Products Edited",
      data: findProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error Occured",
    });
  }
};

// delete  Products
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product)
    return res.status(404).json({
      success: false,
      message: "Product not found ",
    });
  try {
    res.status(200).json({
      success: true,
      message: "Products deleted successfully",
      id: id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};
