import { Router } from 'express';
import { AuthorizationRoutes, ProductRoutes } from './controller';

const router = Router();

router.get('/health-check', (req, res) => {
  res.send('I am OK');
});

router.use('/auth', AuthorizationRoutes);
router.use('/products', ProductRoutes);


export default router;
