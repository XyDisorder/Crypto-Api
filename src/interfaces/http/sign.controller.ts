import {Controller, HttpCode, Post} from "@nestjs/common";
import {JsonValue} from "../../domain/shared/json.types";
import {SignUseCase} from "../../application/use-cases/sign.uc";
import {VerifyUseCase} from "../../application/use-cases/verify.uc";

@Controller()
export class SignController {
    constructor(
        private readonly signUseCase: SignUseCase,
        private readonly verifyUseCase: VerifyUseCase,
    ) {}

    @Post("/sign")
     sign(payload: JsonValue): boolean {
        return this.signUseCase.execute(payload);
    }

    @Post("/verify")
    @HttpCode(204)
    async verify(payload: JsonValue, signature: string): Promise<boolean> {
        return this.verifyUseCase.execute(payload, signature);
    }
}