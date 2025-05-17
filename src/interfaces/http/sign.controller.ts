import {Controller, HttpCode, Post} from "@nestjs/common";
import {JsonValue} from "../../domain/shared/json.types";
import {SignUseCase} from "../../application/use-cases/sign.uc";
import {VerifyUseCase} from "../../application/use-cases/verify.uc";
import {ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiResponse} from "@nestjs/swagger";
import {SignResponseDto} from "./dto/sign.dto";

@Controller()
export class SignController {
    constructor(
        private readonly signUseCase: SignUseCase,
        private readonly verifyUseCase: VerifyUseCase,
    ) {}

    @Post("/sign")
    @HttpCode(200)
    @ApiOperation({ summary: 'Generate a Json payload with a unique signature property' })
    @ApiResponse({status: 200, description: 'Signature calculated successfully', type: SignResponseDto,})
    @ApiResponse({ status: 400,description: 'Invalid payload',})
     sign(payload: JsonValue): string {
        return this.signUseCase.execute(payload);
    }

    @Post('verify')
    @HttpCode(204)
    @ApiOperation({ summary: 'Verify signature validity' })
    @ApiResponse({ status: 204, description: 'Signature is valid' })
    @ApiResponse({ status: 400, description: 'Signature is invalid' })
    async verify(payload: JsonValue, signature: string): Promise<boolean> {
        return this.verifyUseCase.execute(payload, signature);
    }
}