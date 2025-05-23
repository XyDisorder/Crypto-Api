import { Injectable } from '@nestjs/common';
import { SignerPort } from '../../domain/ports/signer.port';
import { JsonValue } from '../../domain/shared/json.types';

@Injectable()
/** Calculates the HMAC (or other algo) signature of a JSON. */
export class SignUseCase {
  constructor(private readonly signer: SignerPort) {}

  execute(data: JsonValue): string {
    return this.signer.sign(data);
  }
}
