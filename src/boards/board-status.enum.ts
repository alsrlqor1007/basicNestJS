// export interface Board {
//     id: string;
//     title: string;
//     description: string;
//     status: BoardStatus;
// }
// 로컬 저장소 데이터 사용 시

// status에 2가지 상태만 나올 수 있게 타입스크립트의 enumeration 이용
export enum BoardStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
}