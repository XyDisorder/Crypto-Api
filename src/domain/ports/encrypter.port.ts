import { JsonMap } from '../shared/json.types';

export abstract class EncrypterPort {
  abstract encryptDepth(payload: JsonMap): JsonMap;
  abstract decryptDepth(payload: JsonMap): JsonMap;
}
