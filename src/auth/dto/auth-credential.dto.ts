import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: 'password only accpets english and number'
    })
    // Matches로 영어와 숫자만 가능한 유효성 체크
    // 첫 번째 인자로 정규표현식, 두 번째 인자로 결과에 따른 메시지
    password: string;
}