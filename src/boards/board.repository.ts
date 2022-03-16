import { EntityRepository, Repository } from 'typeorm';
import { Board } from "./board.entity";
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';

@EntityRepository(Board) // class를 사용자 정의(Custom) 저장소로 선언하는 데 사용된다. 저장소는 일부 특정 entity를 관리하거나 일반 저장소일 수 있다.
export class BoardRepository extends Repository <Board> {
    async createBoard(createBoardDto: CreateBoardDto): Promise <Board> {
        const { title, description } = createBoardDto;

        const board = this.create({
            title, description, status: BoardStatus.PUBLIC
        })

        await this.save(board);

        return board;
    }
}