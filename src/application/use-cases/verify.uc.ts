import { Injectable } from '@nestjs/common';
import { SignerPort } from '../../domain/ports/signer.port';
import { JsonValue } from '../../domain/shared/json.types';

@Injectable()
/** Validate that a signature corresponds to the payload */
export class VerifyUseCase {
  constructor(private readonly signer: SignerPort) {}

  execute(payload: JsonValue, signature: string): boolean {
    return this.signer.verify(payload, signature);
  }
}
