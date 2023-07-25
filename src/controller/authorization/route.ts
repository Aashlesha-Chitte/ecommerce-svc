import { Router } from 'express';
import authorizationController from './authorizationController';
import { authMiddleware } from '../../middlewares/authMiddleware';


const route = Router();

route.route('/signup').post(
  authorizationController.signup,
);

route.route('/login').post(
  authorizationController.login,
);


route.route('/user/:id').get(
  authMiddleware,
  authorizationController.getUser,
);

export default route;
