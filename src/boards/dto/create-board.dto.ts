import { IsNotEmpty } from 'class-validator';

// IsNotEmpty: 빈 값이 들어오는 것을 방지

export class CreateBoardDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}