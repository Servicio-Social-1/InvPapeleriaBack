"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entities/user.entity");
const typeorm_2 = require("typeorm");
let UserRepository = class UserRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async create(createUserDto, role) {
        const user = await this.repository.create({ ...createUserDto, role });
        return await this.repository.save(user);
    }
    async findByEmail(email) {
        return await this.repository.findOneBy({ email });
    }
    async findById(id) {
        return await this.repository.findOne({
            where: { id },
            relations: { role: true },
        });
    }
    async count() {
        return await this.repository.count({ where: { status: true } });
    }
    async findOneWithPassword(emailDto) {
        const { email } = emailDto;
        return await this.repository.findOne({
            where: { email },
            select: {
                email: true,
                id: true,
                password: true,
            },
            relations: { role: true },
        });
    }
    async findAll(paginationDto) {
        const { limit = 20, offset = 0 } = paginationDto;
        return await this.repository.find({
            take: limit,
            skip: offset,
            where: {
                status: true,
            },
        });
    }
    async findAllByRole(role, paginationDto) {
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
    async update(id, updateUserDto) {
        return await this.repository.update({ id }, { id, ...updateUserDto });
    }
    async updateUserWithRole(id, updateUserDto, role) {
        return await this.repository.update({ id }, { id, ...updateUserDto, role });
    }
    async delete(id) {
        return await this.repository.update({ id }, { status: false });
    }
};
UserRepository = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map