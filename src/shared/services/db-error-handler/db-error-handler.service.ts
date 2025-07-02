import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class DbErrorHandlerService {
    handleError(error: any, message = '') {
        if (error.code === '23505') {
            throw new ConflictException(message);
        }
        console.log(error)
        throw new InternalServerErrorException(
            'Error inesperado, llamar al administrador',
        );
    }
}
