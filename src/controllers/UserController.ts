import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { StatusCodes as status } from 'http-status-codes';
import { UsersRepository } from '../repositories/UsersRepository';
import { AppError } from '../errors/AppError';

const message = require('../helpers/responseConstants');
const validator = require('../helpers/validators');

class UserController {
    async create(request: Request, response: Response) {
        const { username, email } = request.body;

        try {
            await validator.validateUser({ username, email });
        } catch (error) {
            throw new AppError(error.message);
        }

        const usersRepository = getCustomRepository(UsersRepository);
        const userAlreadyExists = await usersRepository.findByEmail(email);
        if (userAlreadyExists) 
            throw new AppError(message.userAlreadyExist);

        const user = await usersRepository.createAndSave(username, email);

        return response.status(status.CREATED).json(user);
    }

    async delete(request: Request, response: Response) {
        const userId = parseInt(request.params.userId);

        const userRepository = getCustomRepository(UsersRepository);
        const user = await userRepository.findOne({ where: { id: userId } });
        if (!user) throw new AppError(message.userNotFound, status.NOT_FOUND);

        await userRepository.remove(user);
        return response.status(status.OK).json({ message: message.userDeleted });
    }
}

export { UserController };
