import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';


@Controller('boards')
export class BoardsController {
    // 로컬 저장소 데이터
    /** 
     * Typescript
     * boardsService: BoardsService; // TS에서 property를 사용하려면 미리 선언해줘야 한다.

     * constructor(boardsService: BoardsService) { // BoardsService 객체를 타입으로 constructor 정의
     *     this.boardsService = boardsService; // 프로퍼티 할당
    */
    // 한 줄로 작성 가능
    // 접근 제한자(public, protected, private)를 생성자 안에서 사용하면 해당 파라미터는 암묵적으로 class property로 선언된다.
    constructor(private boardsService: BoardsService) {}

    // @Get('/')
    // getAllBoard(): Board[] {
    //     return this.boardsService.getAllBoards();
    // }

    // @Post()
    // createBoard(
    //     // @Body('title') title: string,
    //     // @Body('description') description: string
    //     @Body() createBoardDto: CreateBoardDto
    // ): Board {
    //     return this.boardsService.createBoard(createBoardDto);
    // }

    // @Get('/:id')
    // getBoardById(@Param('id') id: string): Board {
    //     return this.boardsService.getBoardById(id);
    // }

    // @Delete('/:id')
    // deleteBoard(@Param('id') id: string): void {
    //     this.boardsService.deleteBoard(id);
    // }

    // @Patch('/:id/status')
    // updateBoardStatus(@Param('id') id: string, @Body('status') status: BoardStatus) {
    //     return this.boardsService.updateBoardStatus(id, status);
    // }

    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise <Board> {
        return this.boardsService.getBoardById(id);
    }

    @Post()
    @UsePipes(ValidationPipe) // handler level pipe
    createBoard(@Body() createBoardDto: CreateBoardDto): Promise <Board> {
        return this.boardsService.createBoard(createBoardDto);
    }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id): Promise <void> {
        return this.boardsService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus
    ): Promise <Board> {
        return this.boardsService.updateBoardStatus(id, status);
    }

    @Get()
    getAllTask(): Promise <Board[]> {
        return this.boardsService.getAllBoards();
    }
}