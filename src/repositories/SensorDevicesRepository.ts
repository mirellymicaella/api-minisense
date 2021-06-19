import { EntityRepository, Repository } from 'typeorm';
import { SensorDevice } from '../models/SensorDevice';
const util = require('../helpers/utils');

@EntityRepository(SensorDevice)
class SensorDevicesRepository extends Repository<SensorDevice> {
    async createAndSave(
        label: string,
        description: string,
        userId: number
    ) {
        const device = new SensorDevice();
        device.label = label;
        device.description = description;
        device.key = await this.getUniqueKey() ;
        device.userId = userId;
        return this.manager.save(device);
    }

    findByKey(key: string) {
        return this.findOne({ key });
    }

    async getUniqueKey() {
        let key: string;
        while (true) {
            key = util.generateKey();
            const exist = await this.findByKey(key);
            if (!exist) return key;
            console.log(key);
        }
    }
}

export { SensorDevicesRepository };
