import { IsDefined, IsString } from 'class-validator';
import { JsonValue } from '../../../domain/shared/json.types';

export class SignResponseDto {
  @IsString()
  signature!: string;
}
export class VerifyRequestDto {
  @IsString()
  signature!: string;
  @IsDefined()
  data!: JsonValue;
}
