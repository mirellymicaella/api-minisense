import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { StatusCodes as status } from 'http-status-codes';
import { MeasurementUnitsRepository } from '../repositories/MeasurementUnitsRepository';
import { AppError } from '../errors/AppError';

const message = require('../helpers/responseConstants');
const validator = require('../helpers/validators');

class MeasurementUnitController {
    async index(request: Request, response: Response) {
        const measurementUnitsRepository = getCustomRepository(
            MeasurementUnitsRepository
        );
        const measurementUnits = await measurementUnitsRepository.find();
        return response.status(status.OK).json(measurementUnits);
    }

    async create(request: Request, response: Response) {
        const { symbol, description } = request.body;

        try {
            await validator.validateMeasurementUnit({
                symbol,
                description
            });
        } catch (error) {
            throw new AppError(error.message);
        }

        const measurementUnitsRepository = getCustomRepository(
            MeasurementUnitsRepository
        );
        const measurementUnitAlreadyExists =
            await measurementUnitsRepository.findBySymbol(symbol);

        if (measurementUnitAlreadyExists)
            throw new AppError(message.unitAlreadyExist);

        const measurementUnit = await measurementUnitsRepository.createAndSave(
            symbol,
            description
        );

        return response.status(status.CREATED).json(measurementUnit);
    }
}

export { MeasurementUnitController };
