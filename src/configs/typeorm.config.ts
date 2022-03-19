import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig : TypeOrmModuleOptions = {
    // DB Type
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'BoardProject',
    entities: [__dirname + `/../**/*.entity.{js,ts}`],
    // entitiy를 이용해 데이터베이스 테이블을 생성하기 때문에 entitiy 파일 위치를 설정해준다.
    synchronize: true
    // synchronize: true는 애플리케이션을 재실행할 때 테이블을 Drop한 후, entitiy 안에서 수정된 컬럼의 길이, 타입, 변경 값 등을 다시 생성해준다.
}