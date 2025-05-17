import {JsonMap} from "../shared/json.types";

export abstract class EncrypterPort {
    abstract encryptDepth(payload: JsonMap): Record<string, string>;
    abstract decryptDepth(payload: JsonMap): JsonMap;
}