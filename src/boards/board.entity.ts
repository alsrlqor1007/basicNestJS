import { User } from 'src/auth/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "./board-status.enum";

@Entity() // CREATE TABLE
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn() // Primary Key
    id: number;

    @Column() // 일반 열
    title: string;
    
    @Column()
    description: string;

    @Column()
    status: BoardStatus;

    @ManyToOne(type => User, user => user.boards, { eager: false })
    user: User;
}

// 해당 컬럼들을 가진 Board 테이블 자동 생성