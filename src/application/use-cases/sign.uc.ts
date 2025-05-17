import {Injectable} from "@nestjs/common";
import {SignerPort} from "../../domain/ports/signer.port";
import {JsonValue} from "../../domain/shared/json.types";

/** Calculates the HMAC (or other algo) signature of a JSON. */
@Injectable()
export class SignUseCase {
    constructor(private readonly signer: SignerPort) {}

     execute(data: JsonValue): boolean {
        return this.signer.verify(data);
    }
}