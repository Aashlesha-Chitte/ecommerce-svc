import { Router } from 'express';
import ProductController from './productController';
const route = Router();

route.route('/').post(
  ProductController.createProducts,
);

route.route('/').get(
  ProductController.getProducts,
);

route.route('/:id').put(
  ProductController.updateProducts,
);

route.route('/:id').delete(
  ProductController.deleteProducts,
);

export default route;
