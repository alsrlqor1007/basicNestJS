import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from "./board.entity";
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
    // 로컬 저장소 데이터
    // private boards: Board[] = [];

    // getAllBoards(): Board[] {
    //     return this.boards;
    // }

    // createBoard(
    //     // title: string, description: string
    //     createBoardDto: CreateBoardDto
    //     ) {
    //         const { title, description } = createBoardDto;
    //         const board: Board = {
    //             id: uuid(),
    //             title,
    //             description,
    //             status: BoardStatus.PUBLIC
    //         }
    //     this.boards.push(board);
    //     return board;
    // }

    // getBoardById(id: string): Board {
    //     return this.boards.find((board) => board.id === id);
    // }

    // deleteBoard(id: string): void {
    //     const found = this.getBoardById(id);
    //     this.boards = this.boards.filter((board) => board.id !== found.id);
    // }

    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }

    // DB 작업 시
    // 해당 Service에 Repository Injection
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository
    ) { }

    async getBoardById(id: number): Promise <Board> {
        const found = await this.boardRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        } // 내장 instance

        return found;
    }    

    createBoard(createBoardDto: CreateBoardDto, user: User): Promise <Board> {
        // await 여기서 쓰지 않기 때문에 async 삭제
        // Repository로 넘겨줬고 거기 있는 것을 가져와서 사용

        // const { title, description } = createBoardDto;

        // const board = this.boardRepository.create({
        //     title, description, status: BoardStatus.PUBLIC
        // })

        // await this.boardRepository.save(board);

        return this.boardRepository.createBoard(createBoardDto, user);
    }

    async deleteBoard(id: number, user: User): Promise <void> {
        const result = await this.boardRepository.delete({id, user});

        if (result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise <Board> {
        const board = await this.getBoardById(id);

        board.status = status;
        await this.boardRepository.save(board);

        return board;
    }

    async getAllBoards(user: User): Promise <Board[]> {
        // return this.boardRepository.find();

        const query = this.boardRepository.createQueryBuilder('board');

        query.where('board.userId = :userId', { userId: user.id });
        // id 일치하는 데이터

        const boards = await query.getMany(); // 해당되는 전체 조회

        return boards;
    }
}
