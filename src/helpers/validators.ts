import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import { MeasurementUnitsRepository } from '../repositories/MeasurementUnitsRepository';
const message = require('../helpers/responseConstants');

const unitExists = async (id: any) => {
    if (!id) return false;
    const measurementUnitsRepository = getCustomRepository(
        MeasurementUnitsRepository
    );
    const measurementUnit = await measurementUnitsRepository.findById(id);
    return !!measurementUnit;
};

module.exports = {
    async validateUser(data: Object) {
        const schema = yup.object().shape({
            username: yup.string().required('Name is required.'),
            email: yup.string().email().required('Invalid email.')
        });

        return await schema.validate(data);
    },

    async validateMeasurementUnit(data: Object) {
        const schema = yup.object().shape({
            symbol: yup.string().required('Symbol is required.'),
            description: yup.string().required('Description is required.')
        });

        return await schema.validate(data);
    },

    async validateSensorDevice(data: Object) {
        const schema = yup.object().shape({
            label: yup.string().required('Label is required.'),
            description: yup.string().required('Description is required.')
        });

        return await schema.validate(data);
    },

    async validateSensorData(data: Object) {
        const schema = yup.object().shape({
            timestamp: yup.string().required('Timestamp is required.'),
            value: yup.number().required('Value is required.')
        });

        return await schema.validate(data);
    },

    async validateDataStream(data: Object) {
        const schema = yup.object().shape({
            unitId: yup
                .number()
                .required()
                .test('unit exists', message.unitNotFound, async (id) => {
                    return await unitExists(id);
                }),
            label: yup.string().required('Label is required.')
        });

        return await schema.validate(data);
    },

    async validateDataStreamToUpdate(data: Object) {
        const schema = yup.object().shape({
            enabled: yup.boolean().required('Enabled is required.')
        });

        return await schema.validate(data);
    }
};
