import { Injectable } from '@nestjs/common';
import { EncrypterPort } from '../../domain/ports/encrypter.port';
import { JsonMap } from '../../domain/shared/json.types';
import { Base64Utils } from './utils/base64Utils';

@Injectable()
export class Base64EncrypterAdapter implements EncrypterPort {
  encryptDepth(payload: JsonMap): JsonMap {
    const out: JsonMap = {};
    for (const [k, v] of Object.entries(payload)) {
      out[k] = Base64Utils.toB64(v); // v est bien un JsonValue
    }
    return out;
  }

  decryptDepth(payload: JsonMap): JsonMap {
    const out: JsonMap = {};
    for (const [k, v] of Object.entries(payload)) {
      out[k] = Base64Utils.tryFromB64(v);
    }
    return out;
  }
}
