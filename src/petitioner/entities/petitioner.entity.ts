import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Area } from '../../area/entities/area.entity';
import { ArticleExit } from '../../article-exit/entities/article-exit.entity';

@Entity('petitioners')
export class Petitioner {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 100,
        unique: true,
    })
    name: string;

    @ManyToOne(() => Area, (area) => area.petitioner, {
        cascade: true,
        eager: true,
    })
    @JoinColumn()
    area: Area;

    @OneToMany(
        () => ArticleExit,
        (articleExit: ArticleExit) => articleExit.petitioner,
    )
    articleExit: ArticleExit[];

    @Column({
        type: 'bool',
        default: true,
    })
    status: boolean;

    @BeforeInsert()
    checkSlugInsert() {
        this.name = this.name.trim();
    }

    @BeforeUpdate()
    checkSlugUpdate() {
        this.name = this.name.trim();
    }
}
