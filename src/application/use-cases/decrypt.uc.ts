import { Injectable } from '@nestjs/common';
import { EncrypterPort } from '../../domain/ports/encrypter.port';
import { JsonMap } from '../../domain/shared/json.types';

@Injectable()

/** Does the opposite of EncryptUseCase: if the value is not encoded, leave it. */
export class DecryptUseCase {
    constructor(private readonly encrypter: EncrypterPort) {}

    execute(payload: JsonMap): JsonMap {
        return this.encrypter.decryptDepth(payload);
    }
}