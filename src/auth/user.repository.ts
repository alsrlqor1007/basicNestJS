import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        const salt = await bcrypt.genSalt(); // salt 생성
        const hashedPassword = await bcrypt.hash(password, salt); // 해시 처리

        const user = this.create({ username, password: hashedPassword });
        
        try {
            await this.save(user);
        } catch (error) {
            if (error.code === '23405') {
                throw new ConflictException('Existing username');
            } else {
                throw new InternalServerErrorException();
            }
            console.log('error', error); // error.code 확인 가능
        }
    }
}