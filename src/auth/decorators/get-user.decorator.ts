import {
    createParamDecorator,
    ExecutionContext,
    InternalServerErrorException,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
    (data, context: ExecutionContext) => {
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        if (!user) {
            throw new InternalServerErrorException('User not found in request');
        }
        if (!data) {
            return user;
        }
        if (typeof data === 'string') {
            return user[data];
        }
        const userWithFilteredProps = {};
        for (const userProp of data) {
            if (!user[userProp]) {
                throw new InternalServerErrorException(
                    'Attribute not found in request',
                );
            }
            userWithFilteredProps[userProp] = user[userProp];
        }
        return userWithFilteredProps;
    },
);
