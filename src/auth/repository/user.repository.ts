import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Role } from '../entities/role.entity';
import { LoginUserDto, EmailDto } from '../dto/login-user.dto copy';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto, role: Role) {
        const user = await this.repository.create({ ...createUserDto, role });
        return await this.repository.save(user);
    }

    async findByEmail(email: string) {
        return await this.repository.findOneBy({ email });
    }

    async findById(id: number) {
        return await this.repository.findOne({
            where: { id },
            relations: { role: true },
        });
    }

    async count() {
        return await this.repository.count({ where: { status: true } });
    }

    async findOneWithPassword(emailDto: EmailDto) {
        const { email } = emailDto;
        return await this.repository.findOne({
            where: { email },
            select: {
                email: true,
                id: true,
                // Regresar password a pesar de desactivar su devolucion en la entity
                password: true,
            },
            relations: { role: true },
        });
    }

    async findAll(paginationDto: PaginationDto) {
        const { limit = 20, offset = 0 } = paginationDto;
        return await this.repository.find({
            take: limit,
            skip: offset,
            where: {
                status: true,
            },
        });
    }

    async findAllByRole(role: string, paginationDto: PaginationDto) {
        const { limit = 20, offset = 0 } = paginationDto;
        return await this.repository.find({
            take: limit,
            skip: offset,
            where: {
                status: true,
                role: { name: role },
            },
        });
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        return await this.repository.update({ id }, { id, ...updateUserDto });
    }

    async updateUserWithRole(
        id: number,
        updateUserDto: UpdateUserDto,
        role: Role,
    ) {
        return await this.repository.update(
            { id },
            { id, ...updateUserDto, role },
        );
    }

    async delete(id: number) {
        return await this.repository.update({ id }, { status: false });
    }
}
