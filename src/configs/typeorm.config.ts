import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from 'config';

const dbConfig = config.get('db');

export const typeORMConfig : TypeOrmModuleOptions = {
    // DB Type
    type: dbConfig.type,
    host: process.env.RDS_HOSTNAME || dbConfig.host,
    port: process.env.RDS_PORT || dbConfig.port,
    username: process.env.RDS_USERNAME || dbConfig.username,
    password: process.env.RDS_PASSWORD || dbConfig.password,
    database: process.env.RDS_DB_NAME || dbConfig.database,
    entities: [__dirname + `/../**/*.entity.{js,ts}`],
    // entity를 이용해 데이터베이스 테이블을 생성하기 때문에 entitiy 파일 위치를 설정해준다.
    synchronize: dbConfig.synchronize
    // synchronize: true는 애플리케이션을 재실행할 때 테이블을 Drop한 후, entity 안에서 수정된 컬럼의 길이, 타입, 변경 값 등을 다시 생성해준다.
}