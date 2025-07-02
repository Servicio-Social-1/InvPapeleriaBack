import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { RoleService } from '../role/role.service';
import { DbErrorHandlerService } from '../../shared/services/db-error-handler/db-error-handler.service';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { SuccessfullyResponse } from '../../shared/interfaces/success-response';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { UpdateUserRoleDto } from '../dto/update-user-role.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly roleService: RoleService,
        private readonly jwtService: JwtService,
        private readonly dbErrorHandlerService: DbErrorHandlerService,
    ) { }

    async findAll(paginationDto: PaginationDto) {
        const articles = await this.userRepository.findAll(paginationDto);
        if (articles.length === 0) {
            throw new NotFoundException('Aún no existen usuarios');
        }
        return articles;
    }

    async findAllByRole(role: string, paginationDto: PaginationDto) {
        await this.roleService.findOneByName(role);
        const users = await this.userRepository.findAllByRole(
            role,
            paginationDto,
        );
        if (users.length === 0) {
            throw new BadRequestException('Aún no existen usuarios');
        }
        return users;
    }

    async findOne(term: string & number) {
        let user: User;
        if (!isNaN(+term)) {
            user = await this.findById(+term);
        } else {
            user = await this.userRepository.findByEmail(term);
        }

        if (!user) {
            throw new NotFoundException(
                `No se encontró el usuario con el id o email: ${term}`,
            );
        }
        return user;
    }

    async count() {
        return this.userRepository.count();
    }

    async findById(id: number) {
        const user = await this.userRepository.findById(id);
        if (!user || !user.status) {
            throw new NotFoundException(
                `No se encontró el usuario con el id: ${id}`,
            );
        }
        return user;
    }

    async update(
        id: number,
        updateUserDto: UpdateUserDto,
    ): Promise<Error | SuccessfullyResponse> {
        const user = await this.findById(id);
        try {
            const { email, password, name } = updateUserDto;
            console.log(name);
            const updateData = password
                ? {
                    email,
                    name,
                    password: bcrypt.hashSync(updateUserDto.password, 10),
                }
                : { email, name };
            await this.userRepository.update(id, {
                ...updateData,
            });
            return {
                message: `Usuario ${updateUserDto.email} actualizado correctamente.`,
            };
        } catch (error) {
            this.dbErrorHandlerService.handleError(
                error,
                `El usuario con el email ${updateUserDto.email} ya existe`,
            );
        }
    }

    async updateUserWithRole(
        id: number,
        updateUserWithRoleDto: UpdateUserRoleDto,
    ): Promise<Error | SuccessfullyResponse> {
        const user = await this.findById(id);
        const role = await this.roleService.findOneByName(
            updateUserWithRoleDto.role,
        );
        try {
            await this.userRepository.updateUserWithRole(
                id,
                updateUserWithRoleDto,
                role,
            );
            return {
                message: `Usuario ${updateUserWithRoleDto.email} actualizado correctamente.`,
            };
        } catch (error) {
            this.dbErrorHandlerService.handleError(
                error,
                `El usuario con el email ${updateUserWithRoleDto.email} ya existe`,
            );
        }
    }

    async remove(id: number): Promise<Error | SuccessfullyResponse> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundException(
                `No se encontró el articulo con el id: ${id}`,
            );
        }
        if (!user.status) {
            throw new BadRequestException(
                `El artículo con el email: ${user.email} ya se encuentra eliminado`,
            );
        }
        const { affected } = await this.userRepository.delete(id);
        if (affected === 1) {
            return {
                message: `Artículo ${user.email} eliminado correctamente.`,
            };
        }
    }
}
