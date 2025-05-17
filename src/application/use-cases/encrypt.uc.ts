import { Injectable } from '@nestjs/common';
import { EncrypterPort } from '../../domain/ports/encrypter.port';
import {JsonMap} from "../../domain/shared/json.types";

@Injectable()
/** Transforms each property (depth 1) to Base64 (or other, via port). */
export class EncryptUseCase {
    constructor(private readonly encrypter: EncrypterPort) {}

    execute(payload: JsonMap): Record<string, string> {
        return this.encrypter.encryptDepth(payload);
    }
}