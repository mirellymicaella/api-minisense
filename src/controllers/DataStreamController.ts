import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { StatusCodes as status } from 'http-status-codes';
import { DataStreamsRepository } from '../repositories/DataStreamsRepository';
import { SensorDevicesRepository } from '../repositories/SensorDevicesRepository';
import { AppError } from '../errors/AppError';
import { SensorDatasRepository } from '../repositories/SensorDatasRepository';

const message = require('../helpers/responseConstants');
const validator = require('../helpers/validators');

class DataStreamController {
    async index(request: Request, response: Response) {
        const { deviceKey } = request.params;

        const sensorDevicesRepository = getCustomRepository(
            SensorDevicesRepository
        );
        const sensorDevice = await sensorDevicesRepository.findByKey(deviceKey);
        if (!sensorDevice)
            throw new AppError(message.deviceNotFound, status.NOT_FOUND);

        const dataStreamsRepository = getCustomRepository(
            DataStreamsRepository
        );
        const dataStreams = await dataStreamsRepository.find({
            where: { deviceId: sensorDevice.id }
        });

        return response.status(status.OK).json(dataStreams);
    }

    async create(request: Request, response: Response) {
        const { deviceKey } = request.params;
        const { label, unitId } = request.body;

        const sensorDevicesRepository = getCustomRepository(
            SensorDevicesRepository
        );
        const sensorDevice = await sensorDevicesRepository.findByKey(deviceKey);
        if (!sensorDevice)
            throw new AppError(message.deviceNotFound, status.NOT_FOUND);

        const dataStreamsRepository = getCustomRepository(
            DataStreamsRepository
        );

        try {
            await validator.validateDataStream({ label, unitId });
        } catch (error) {
            throw new AppError(error.message);
        }

        const key = await dataStreamsRepository.getUniqueKey();

        const dataStream = await dataStreamsRepository.createAndSave(
            label,
            unitId,
            sensorDevice.id
        );

        return response.status(status.CREATED).json({
            id: dataStream.id,
            label,
            key,
            unitId,
            deviceId: sensorDevice.id,
            measurementCount: 0
        });
    }

    async update(request: Request, response: Response) {
        const { streamKey } = request.params;
        const { enabled } = request.body;

        const dataStreamsRepository = getCustomRepository(
            DataStreamsRepository
        );
        const dataStream = await dataStreamsRepository.findByKey(streamKey);
        if (!dataStream)
            throw new AppError(message.streamNotFound, status.NOT_FOUND);

        try {
            await validator.validateDataStreamToUpdate({ enabled });
        } catch (error) {
            throw new AppError(error.message);
        }

        dataStream.enabled = enabled;
        dataStreamsRepository.save(dataStream);

        return response.status(status.OK).json(dataStream);
    }

    async register(request: Request, response: Response) {
        const { timestamp, value } = request.body;
        const { streamKey } = request.params;

        const dataStreamsRepository = getCustomRepository(
            DataStreamsRepository
        );
        const dataStream = await dataStreamsRepository.findByKey(streamKey);

        if (!dataStream)
            throw new AppError(message.streamNotFound, status.NOT_FOUND);

        try {
            await validator.validateSensorData({ timestamp, value });
        } catch (error) {
            throw new AppError(error.message);
        }

        const unitId = dataStream.unitId;
        const streamId = dataStream.id;

        const sensorDatasRepository = getCustomRepository(
            SensorDatasRepository
        );
        const sensorData = await sensorDatasRepository.createAndSave(
            timestamp,
            value,
            unitId,
            streamId
        );

        dataStream.measurementCount++;
        await dataStreamsRepository.save(dataStream);

        return response.status(status.CREATED).json({
            id: sensorData.id,
            timestamp,
            value,
            unitId
        });
    }
}

export { DataStreamController };
