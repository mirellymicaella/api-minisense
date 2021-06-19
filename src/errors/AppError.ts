import { StatusCodes, getReasonPhrase } from 'http-status-codes';

export class AppError {
    public readonly error: string;
    public readonly status: number;
    public readonly message: string;

    constructor(message: string, status = StatusCodes.BAD_REQUEST) {
        this.message = message;
        this.status = status;
        this.error = getReasonPhrase(status);
    }
}
