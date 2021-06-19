import { Router } from 'express';

import { MeasurementUnitController } from '../controllers/MeasurementUnitController';
const measurementUnitController = new MeasurementUnitController();

const router = Router();

router.get('/', measurementUnitController.index);
router.post('/', measurementUnitController.create);

module.exports = router;

