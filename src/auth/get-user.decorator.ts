import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest(); // req 안에 유저 객체가 포함되어있다는 것 전제
    return req.user; // user만 리턴
})