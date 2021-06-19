import { EntityRepository, Repository } from 'typeorm';
import { DataStream } from '../models/DataStream';
const util = require('../helpers/utils');

@EntityRepository(DataStream)
class DataStreamsRepository extends Repository<DataStream> {
    async createAndSave(
        label: string,
        unitId: number,
        deviceId: number
    ) {
        const stream = new DataStream();
        stream.label = label;
        stream.key = await this.getUniqueKey();
        stream.unitId = unitId;
        stream.deviceId = deviceId;
        return this.manager.save(stream);
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

export { DataStreamsRepository };
