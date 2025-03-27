import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

class ProductService {
    private static instance: ProductService;

    // Mock products data
    private mockProducts: { id: number; _id: number; name: string; price: number; quantity: number; image: string }[] = [];
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
        const smartphoneimage = 'https://img.freepik.com/free-vector/realistic-display-smartphone-with-different-apps_52683-30241.jpg?t=st=1743086211~exp=1743089811~hmac=8ddef7d844feba4782fbd9e364b03e8b609643eb423e8feb31528c0ed09b0c71&w=1380';
        this.mockProducts = [
            {
                id: this.productIndex++,
                _id: this.productIndex++,
                name: 'Mock Product 1',
                price: 19.99,
                quantity: 10,
                image: smartphoneimage,
            },
            {
                id: this.productIndex++,
                _id: this.productIndex++,
                name: 'Mock Product 2',
                price: 29.99,
                quantity: 5,
                image: smartphoneimage,
            },
            {
                id: this.productIndex++,
                _id: this.productIndex++,
                name: 'Mock Product 3',
                price: 39.99,
                quantity: 15,
                image: smartphoneimage,
            },
        ];
    }

    public async getProducts(req: Request, res: Response, next: NextFunction) {
        try {
            return res.send({ message: 'Success', status: 200, data: this.mockProducts });
        } catch (error) {
            return res.send({ message: 'Error fetching products', status: 500, error });
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