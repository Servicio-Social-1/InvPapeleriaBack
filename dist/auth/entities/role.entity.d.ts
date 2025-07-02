import { User } from './user.entity';
export declare class Role {
    id: number;
    name: string;
    user: User;
    checkNameInsert(): void;
    checkNameUpdate(): void;
}
