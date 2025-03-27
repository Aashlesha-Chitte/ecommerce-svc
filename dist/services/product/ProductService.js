"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class ProductService {
    constructor() {
        // Mock products data
        this.mockProducts = [];
        this.productIndex = 1; // Simple incrementing ID for mock products
    }
    static getInstance() {
        if (!ProductService.instance) {
            ProductService.instance = new ProductService();
            // Populate initial mock data
            ProductService.instance.initializeMockData();
        }
        return ProductService.instance;
    }
    initializeMockData() {
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
    getProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.send({ message: 'Success', status: 200, data: this.mockProducts });
            }
            catch (error) {
                return res.send({ message: 'Error fetching products', status: 500, error });
            }
        });
    }
    createProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
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
            }
            catch (e) {
                return res.send({ message: 'Error in creating product', status: 500, error: e });
            }
        });
    }
    updateProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = parseInt(req.params.id, 10);
                const productIndex = this.mockProducts.findIndex(product => product.id === productId);
                // Check if product exists
                if (productIndex === -1) {
                    return res.send({ message: `Cannot find any product with ID ${productId}`, status: 404 });
                }
                // Update the product details
                this.mockProducts[productIndex] = Object.assign(Object.assign({}, this.mockProducts[productIndex]), req.body);
                return res.send({ message: 'Success', status: 200, data: this.mockProducts[productIndex] });
            }
            catch (e) {
                return res.send({ message: 'Error in updating product', status: 500, error: e });
            }
        });
    }
    deleteProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
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
            }
            catch (e) {
                return res.send({ message: 'Error in deleting product', status: 500, error: e });
            }
        });
    }
}
exports.default = ProductService.getInstance();
//# sourceMappingURL=ProductService.js.map