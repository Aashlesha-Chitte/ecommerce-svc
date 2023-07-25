import * as mongoose from 'mongoose';

import { Document, Schema } from 'mongoose';

interface IProductsModel extends Document {
    name: string;
    price: number;
    quantity: number;
    image: string;
}

const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 0 },
    image: {type: String, default: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60'}
}, {
    timestamps: true
}
);


const Product: mongoose.Model<IProductsModel> = mongoose.model<IProductsModel>('Product', productSchema, 'Product');

export default Product;