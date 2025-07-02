import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ArticleEntry } from '../../article-entry/entities/article-entry.entity';
import { ArticleExit } from '../../article-exit/entities/article-exit.entity';
import { Role } from './role.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 100,
        unique: true,
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true,
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 100,
        select: false,
    })
    password: string;

    @Column({
        type: 'bool',
        default: true,
    })
    status: boolean;

    @ManyToOne(() => Role, (role: Role) => role, { cascade: true, eager: true })
    role: Role;

    @OneToMany(
        () => ArticleEntry,
        (articleEntry: ArticleEntry) => articleEntry.user,
    )
    articleEntry: ArticleEntry[];

    @OneToMany(
        () => ArticleExit,
        (articleExit: ArticleExit) => articleExit.user,
    )
    articleExit: ArticleExit[];
}
