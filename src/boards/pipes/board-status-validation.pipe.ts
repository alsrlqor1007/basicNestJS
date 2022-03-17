import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../board-status.enum';

export class BoardStatusValidationPipe implements PipeTransform {
    readonly StatusOptions = [
        BoardStatus.PRIVATE,
        BoardStatus.PUBLIC
    ]
    transform(value: any) {
        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} isn't in the status options`)
        }

        return value;
    }

    private isStatusValid(status: any) {
        const index = this.StatusOptions.indexOf(status);
        return index !== -1;
    }
}

/*
transform() 메서드: 파라미터 2개.
첫 번째 파라미터는 처리가 된 인자의 값(value)
두 번째 파라미터는 인자에 대한 메타 데이터를 포함한 객체
return 값은 Route 핸들러로 전해진다. Exception 발생 시 클라이언트로 바로 전달.
*/

// 구현하고자 하는 커스텀 파이프: Status로 PUBLC과 PRIVATE만 올 수 있기 때문에 이외의 값에 에러 처리
// readonly class property: 읽기전용으로 만드는데 사용. 외부에서 액세스는 가능하지만 해당 값 변경은 불가