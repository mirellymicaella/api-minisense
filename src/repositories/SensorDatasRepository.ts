import { EntityRepository, Repository } from 'typeorm';
import { SensorData } from '../models/SensorData';

@EntityRepository(SensorData)
class SensorDatasRepository extends Repository<SensorData> {
    createAndSave(
        timestamp: Date,
        value: number,
        unitId: number,
        dataStreamId: number
    ) {
        const data = new SensorData();
        data.timestamp = timestamp;
        data.value = value;
        data.unitId = unitId;
        data.dataStreamId = dataStreamId;
        return this.manager.save(data);
    }
}

export { SensorDatasRepository };
