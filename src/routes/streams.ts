import { Router } from 'express';

import { DataStreamController } from '../controllers/DataStreamController';

const dataStreamController = new DataStreamController();

const router = Router();

router.put('/:streamKey', dataStreamController.update);
router.post('/:streamKey/datas', dataStreamController.register);


module.exports = router;

