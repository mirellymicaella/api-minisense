import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { StatusCodes as status } from 'http-status-codes';
import { SensorDevicesRepository } from '../repositories/SensorDevicesRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import { AppError } from '../errors/AppError';

const message = require('../helpers/responseConstants');
const util = require('../helpers/utils');
const validator = require('../helpers/validators');

class SensorDeviceController {
    async index(request: Request, response: Response) {
        const userId = parseInt(request.params.userId);

        const userRepository = getCustomRepository(UsersRepository);
        const user = await userRepository.findOne({ where: { id: userId } });

        if (!user) throw new AppError(message.userNotFound, status.NOT_FOUND);

        const sensorDevicesRepository = getCustomRepository(
            SensorDevicesRepository
        );

        // get all devices (some columns) -> all streams
        const sensorDevices = await sensorDevicesRepository
            .createQueryBuilder('device')
            .where({ userId })
            .select([
                'device.id',
                'device.key',
                'device.label',
                'device.description'
            ])
            .leftJoinAndSelect('device.streams', 'streams')
            .getMany();

        return response.status(status.OK).json(sensorDevices);
    }

    async show(request: Request, response: Response) {
        const { deviceKey } = request.params;

        const sensorDevicesRepository = getCustomRepository(
            SensorDevicesRepository
        );

        // get one device -> all streams -> all measurements (some columns)
        const sensorDevice = await sensorDevicesRepository
            .createQueryBuilder('device')
            .where({ key: deviceKey })
            .leftJoinAndSelect('device.streams', 'streams')
            .leftJoinAndSelect('streams.measurements', 'measurements')
            .addSelect('measurements.timestamp')
            .addSelect('measurements.value')
            .getOne();

        if (!sensorDevice)
            throw new AppError(message.deviceNotFound, status.NOT_FOUND);

        // Get 5 recent measurements for each stream
        sensorDevice.streams.forEach((stream) => {
            util.sortDataByDate(stream.measurements);
            stream.measurements = stream.measurements.slice(0, 5);
        });

        return response.status(status.OK).json(sensorDevice);
    }

    async create(request: Request, response: Response) {
        const { label, description } = request.body;
        const userId = parseInt(request.params.userId);

        const userRepository = getCustomRepository(UsersRepository);
        const user = await userRepository.findById(userId);
        if (!user) throw new AppError(message.userNotFound, status.NOT_FOUND);

        try {
            await validator.validateSensorDevice({ label, description });
        } catch (error) {
            throw new AppError(error.message);
        }

        const sensorDevicesRepository = getCustomRepository(
            SensorDevicesRepository
        );
        const sensorDevice = await sensorDevicesRepository.createAndSave(
            label,
            description,
            userId
        );

        return response.status(status.CREATED).json({
            id: sensorDevice.id,
            key: sensorDevice.key,
            label,
            description
        });
    }

    async delete(request: Request, response: Response) {
        const { deviceKey } = request.params;

        const deviceRepository = getCustomRepository(SensorDevicesRepository);
        const device = await deviceRepository.findByKey(deviceKey);
        if (!device)
            throw new AppError(message.deviceNotFound, status.NOT_FOUND);

        await deviceRepository.remove(device);
        return response
            .status(status.OK)
            .json({ message: message.deviceDeleted });
    }
}

export { SensorDeviceController };
