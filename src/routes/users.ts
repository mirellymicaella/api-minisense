
import { Router } from 'express';

import { UserController } from '../controllers/UserController';
import { SensorDeviceController } from '../controllers/SensorDeviceController';

const sensorDeviceController = new SensorDeviceController();
const userController = new UserController();

const router = Router();

router.post('/', userController.create);
router.get('/:userId/devices', sensorDeviceController.index);
router.post('/:userId/devices', sensorDeviceController.create);
router.delete('/:userId', userController.delete);

module.exports = router;

