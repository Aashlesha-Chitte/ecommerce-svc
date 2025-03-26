import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

class ProductService {
    private static instance: ProductService;

    // Mock products data
    private mockProducts: Array<{ id: number; _id: number; name: string; price: number; quantity: number; image: string }> = [];
    private productIndex: number = 1; // Simple incrementing ID for mock products

    public static getInstance(): ProductService {
        if (!ProductService.instance) {
            ProductService.instance = new ProductService();
            // Populate initial mock data
            ProductService.instance.initializeMockData();
        }
        return ProductService.instance;
    }

    private initializeMockData() {
        this.mockProducts = [
            {
                id: this.productIndex++,
                _id: this.productIndex++,
                name: 'Mock Product 1',
                price: 19.99,
                quantity: 10,
                image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60',
            },
            {
                id: this.productIndex++,
                _id: this.productIndex++,
                name: 'Mock Product 2',
                price: 29.99,
                quantity: 5,
                image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60',
            },
            {
                id: this.productIndex++,
                _id: this.productIndex++,
                name: 'Mock Product 3',
                price: 39.99,
                quantity: 15,
                image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60',
            },
        ];
    }

    public async getProducts(req: Request, res: Response, next: NextFunction) {
        try {
            return res.send({ message: 'Success', status: 200, data: this.mockProducts });
        } catch (error) {
            return res.send({ message: 'Error fetching products', status: 500, error: error });
        }
    }

    public async createProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, price, quantity, image } = req.body;
            const newProduct = { 
                id: this.productIndex++, 
                _id: this.productIndex++, 
                name, 
                price, 
                quantity, 
                image 
            };
            this.mockProducts.push(newProduct); // Add product to mock data
            return res.send({ message: 'Success', status: 200, data: newProduct });
        } catch (e) {
            return res.send({ message: 'Error in creating product', status: 500, error: e });
        }
    }

    public async updateProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const productId = parseInt(req.params.id, 10);
            const productIndex = this.mockProducts.findIndex(product => product.id === productId);

            // Check if product exists
            if (productIndex === -1) {
                return res.send({ message: `Cannot find any product with ID ${productId}`, status: 404 });
            }

            // Update the product details
            this.mockProducts[productIndex] = { 
                ...this.mockProducts[productIndex], 
                ...req.body 
            };

            return res.send({ message: 'Success', status: 200, data: this.mockProducts[productIndex] });
        } catch (e) {
            return res.send({ message: 'Error in updating product', status: 500, error: e });
        }
    }

    public async deleteProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const productId = parseInt(req.params.id, 10);
            const productIndex = this.mockProducts.findIndex(product => product.id === productId);

            // Check if product exists
            if (productIndex === -1) {
                return res.send({ message: `Cannot find any product with ID ${productId}`, status: 404 });
            }

            // Remove the product from the mock data
            this.mockProducts.splice(productIndex, 1); 

            return res.send({ message: 'Success', status: 200 });
        } catch (e) {
            return res.send({ message: 'Error in deleting product', status: 500, error: e });
        }
    }
}

export default ProductService.getInstance();