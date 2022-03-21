import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";
import * as config from 'config';

@Injectable() // 종속성 주입을 위한 데코레이터
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({ // 옵션
            secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
            // 토큰이 유효한지 체크할 때 사용하는 secret
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
            // 토큰을 인증할 때 어디에서 가져오는지
            // Authorization Header의 Bearer Token 타입에서 가져와서 유효한지 확인한다는 것
        })
    }

    // 유효할 때 실행
    async validate(payload) {
        const { username } = payload;
        const user: User = await this.userRepository.findOne({ username });
        // 유저 정보 확인

        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}