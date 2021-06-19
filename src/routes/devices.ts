import { Router } from 'express';

import { SensorDeviceController } from '../controllers/SensorDeviceController';
import { DataStreamController } from '../controllers/DataStreamController';

const sensorDeviceController = new SensorDeviceController();
const dataStreamController = new DataStreamController();

const router = Router();

router.get('/:deviceKey', sensorDeviceController.show);
router.delete('/:deviceKey', sensorDeviceController.delete);
router.get('/:deviceKey/streams', dataStreamController.index);
router.post('/:deviceKey/streams', dataStreamController.create);

module.exports = router;
