import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Repository } from 'typeorm';
import { RoleDto } from '../dto/role.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleRepository {
    constructor(
        @InjectRepository(Role)
        private readonly repository: Repository<Role>,
    ) { }

    async create(name: RoleDto) {
        const role = this.repository.create(name);
        return await this.repository.save(role);
    }

    async update(id: number, name: RoleDto) {
        return await this.repository.update(id, name);
    }

    async findOneByName(name: string) {
        return await this.repository.findOneBy({ name });
    }

    async findOneById(id: number) {
        return await this.repository.findOneBy({ id });
    }

    async findAll() {
        return await this.repository.find();
    }
}
