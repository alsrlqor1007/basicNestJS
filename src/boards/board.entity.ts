import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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
}

// 헤딩 컬럼들을 가진 Board 테이블 자동  생성