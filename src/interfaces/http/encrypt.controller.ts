import {Controller, Post} from "@nestjs/common";
import {EncryptUseCase} from "../../application/use-cases/encrypt.uc";
import {DecryptUseCase} from "../../application/use-cases/decrypt.uc";
import {JsonMap} from "../../domain/shared/json.types";

@Controller()
export class EncryptController {
    constructor(
        private readonly encryptUseCase: EncryptUseCase,
        private readonly decryptUseCase: DecryptUseCase,
    ) {}


    @Post("/encrypt")
     encrypt(payload: JsonMap): Record<string, string> {
        return this.encryptUseCase.execute(payload);
    }

    @Post("/decrypt")
     decrypt(payload: JsonMap): JsonMap {
        return this.decryptUseCase.execute(payload);
    }
}