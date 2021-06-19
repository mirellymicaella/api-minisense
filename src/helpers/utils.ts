import { randomBytes } from 'crypto';
import { getCustomRepository, Repository } from 'typeorm';
import { SensorData } from '../models/SensorData';


module.exports = {
    
    sortDataByDate(array: Array<SensorData>) {
        array.sort(
            (a: SensorData, b: SensorData) =>
                b.timestamp.valueOf() - a.timestamp.valueOf()
        );
    },

    generateKey(caracters = 32 ) {
        return randomBytes(caracters).toString('hex');
    },

};
