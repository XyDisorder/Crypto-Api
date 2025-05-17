import {JsonValue} from "../shared/json.types";

export abstract class SignerPort {
    abstract sign(data: JsonValue): string;
    abstract verify(data: JsonValue): boolean;
}
