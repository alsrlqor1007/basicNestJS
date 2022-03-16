import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';

// 진입점 (express app.js에서 route로 나눠보내주는 것처럼 모듈을 등록한다.)
// 모듈은 기능별로 생성한다. 여러 모듈 간 동일한 인스턴스 제공한다.

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), BoardsModule],
})
export class AppModule {}
