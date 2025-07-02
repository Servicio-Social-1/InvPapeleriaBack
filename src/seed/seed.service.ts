import { BadRequestException, Injectable } from '@nestjs/common';
import { AvailableRoles } from 'src/auth/enum/roles.enum';
import { v4 as uuid } from 'uuid';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UserService } from '../auth/user/user.service';
import { RoleService } from '../auth/role/role.service';

@Injectable()
export class SeedService {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly roleService: RoleService,
    ) { }

    async createAdmin(createUserDto: CreateUserDto) {
        const { email, password, name } = createUserDto;
        try {
            const usersExists = await this.userService.findAll({
                limit: 1,
                offset: 0,
            });
            if (usersExists.length) {
                throw new BadRequestException('Ya existe el primer admin');
            }
        } catch (error) {
            if (error?.response?.statusCode === 404) {
                await this.roleService.create({
                    name: AvailableRoles.ADMIN,
                });
                const newAdmin: CreateUserDto = {
                    email,
                    name,
                    password,
                };
                return {
                    newAdmin,
                    adminData: await this.authService.register(
                        newAdmin,
                        AvailableRoles.ADMIN,
                    ),
                };
            }
            if (error?.response?.statusCode === 400) {
                throw new BadRequestException('Ya existe el primer admin');
            }
        }
    }
}
