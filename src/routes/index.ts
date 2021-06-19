import { Router } from 'express';

const router = Router();

router.use('/users',require('./users'));
router.use('/units', require('./units'));
router.use('/devices', require('./devices'));
router.use('/streams', require('./streams'));

export { router };
