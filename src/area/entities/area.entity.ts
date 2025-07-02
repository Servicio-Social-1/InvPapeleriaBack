import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Petitioner } from '../../petitioner/entities/petitioner.entity';
import { ArticleExit } from '../../article-exit/entities/article-exit.entity';

@Entity('areas')
export class Area {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 100,
        unique: true,
    })
    name: string;

    @Column({
        type: 'bool',
        default: true,
    })
    status: boolean;

    @OneToMany(() => Petitioner, (petitioner: Petitioner) => petitioner.area)
    @JoinColumn()
    petitioner: Petitioner[];

    @OneToMany(
        () => ArticleExit,
        (articleExit: ArticleExit) => articleExit.area,
    )
    articleExit: ArticleExit[];

    @BeforeInsert()
    checkSlugInsert() {
        this.name = this.name.trim();
    }

    @BeforeUpdate()
    checkSlugUpdate() {
        this.name = this.name.trim();
    }
}
