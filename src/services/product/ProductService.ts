import { NextFunction, Request, Response } from 'express';

import Product from '../../models/products';
import mongoose from 'mongoose';

class ProductService {

  public static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }
  private static instance: ProductService;

  public static generateObjectId() {
    return String(new mongoose.Types.ObjectId());
  }

  public async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await Product.find();
      return res.send({ message: 'Success', status: 200, data: products });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products' });
    }  
  }

  public async createProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, price, quantity, image } = req.body;
      const products = await Product.create({ name, price, quantity, image });
      return res.send({ message: 'Success', status: 200, data: products });
    } catch (e) {
      console.log(`ProductService :: createProducts :: Error
      `, JSON.stringify(e));
      return res.send({ message: 'Error in creating product', status: 500, error: e });
    }

  }

  public async updateProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);

      // we cannot find any product in database
      if (!product) {
        return res.send({ message: `cannot find any product with ID ${productId}`, status: 404 });
      }
      await Product.findByIdAndUpdate(productId, req.body);
      const updatedProductData = await Product.findById(productId)
      return res.send({ message: 'Success', status: 200, data: updatedProductData });
    } catch (e) {
      console.log(`ProductService :: updateProducts :: Error
      `, JSON.stringify(e));
      return res.send({ message: 'Error in creating product', status: 500, error: e });
    }
  }

  public async deleteProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if (!product) {
        return res.send({ message: `cannot find any product with ID ${productId}`, status: 404 });
      }
      await Product.findByIdAndDelete(productId);
      return res.send({ message: 'Success', status: 200 });
    } catch (e) {
      console.log(`ProductService :: deleteProducts :: Error
      `, JSON.stringify(e));
      return res.send({ message: 'Error in creating product', status: 500, error: e });
    }
  }

}

export default ProductService.getInstance();
