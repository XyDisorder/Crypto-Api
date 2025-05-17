import { JsonValue } from '../shared/json.types';

export abstract class SignerPort {
  abstract sign(data: JsonValue, algorithm?: string): string;
  abstract verify(data: JsonValue, signature: string): boolean;
}
