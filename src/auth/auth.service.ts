import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) { }

    // 회원가입
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.createUser(authCredentialsDto);
    }

    // 로그인
    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        const { username, password } = authCredentialsDto;
        const user = await this.userRepository.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            // 입력 받은 password와 실제 user의 password 비교
            // return 'logIn success'

            // 유저 토큰 생성 (Secret + Payload)
            const payload = { username }; // payload에는 민감정보 포함하지 말 것
            const accessToken = await this.jwtService.sign(payload);
            return { accessToken: accessToken };
        } else {
            throw new UnauthorizedException('login failed')
        }
    }
}
