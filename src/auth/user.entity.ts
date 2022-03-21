import { Board } from 'src/boards/board.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    // 관계 설정
    @OneToMany(type => Board, board => board.user, { eager: true }) // 해당 user의 Board 데이터도 모두 가져올 수 있는 옵션
    boards: Board[]
}