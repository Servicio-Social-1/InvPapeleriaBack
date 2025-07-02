import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { AvailableRoles } from '../enum/roles.enum';

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 100,
        default: AvailableRoles.USER,
        unique: true,
    })
    name: string;

    @OneToMany(() => User, (user: User) => user.role)
    user: User;

    @BeforeInsert()
    checkNameInsert() {
        this.name = this.name
            .toUpperCase()
            .replace(new RegExp(' ', 'g'), '_')
            .replace(new RegExp('\'', 'g'), '');
    }

    @BeforeUpdate()
    checkNameUpdate() {
        this.name = this.name
            .toUpperCase()
            .replace(new RegExp(' ', 'g'), '_')
            .replace(new RegExp('\'', 'g'), '');
    }
}
