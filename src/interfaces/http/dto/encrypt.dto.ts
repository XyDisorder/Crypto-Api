import { IsObject, IsDefined } from 'class-validator';
import { JsonMap } from '../../../domain/shared/json.types';

export class EncryptRequestDto {
    @IsObject()
    @IsDefined()
    body!: JsonMap;
}
export class EncryptResponseDto {
    @IsObject()
    @IsDefined()
    body!: Record<string, string>;
}

export class DecryptRequestDto {
    @IsObject()
    @IsDefined()
    body!: JsonMap;
}

export class DecryptResponseDto {
    data!: JsonMap;
}