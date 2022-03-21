import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';


@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    private logger = new Logger('BoardsController');
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
    createBoard(
        @Body() createBoardDto: CreateBoardDto,
        @GetUser() user: User // 게시물 생성 시 유저 정보 함께 넣어주기
    ): Promise <Board> {
        this.logger.verbose(`User ${user.username} creating a new board. Payload: ${JSON.stringify(createBoardDto)}`)
        return this.boardsService.createBoard(createBoardDto, user);
    }

    @Delete('/:id')
    deleteBoard(
        @Param('id', ParseIntPipe) id,
        @GetUser() user: User
    ): Promise <void> {
        return this.boardsService.deleteBoard(id, user);
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus
    ): Promise <Board> {
        return this.boardsService.updateBoardStatus(id, status);
    }

    @Get()
    getAllBoard(
        @GetUser() user: User
    ): Promise <Board[]> {
        this.logger.verbose(`User ${user.username} trying to get all boards`);
        return this.boardsService.getAllBoards(user);
    }
}