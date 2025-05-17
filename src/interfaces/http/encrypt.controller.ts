import {Body, Controller, HttpCode, Param, Post} from "@nestjs/common";
import {EncryptUseCase} from "../../application/use-cases/encrypt.uc";
import {DecryptUseCase} from "../../application/use-cases/decrypt.uc";
import {JsonMap} from "../../domain/shared/json.types";
import {ApiBody, ApiOperation, ApiResponse} from "@nestjs/swagger";
import {DecryptRequestDto, DecryptResponseDto, EncryptRequestDto, EncryptResponseDto} from "./dto/encrypt.dto";

@Controller()
export class EncryptController {
    constructor(
        private readonly encryptUseCase: EncryptUseCase,
        private readonly decryptUseCase: DecryptUseCase,
    ) {}


    @Post("/encrypt")
    @HttpCode(200)
    @ApiOperation({ summary: 'Generate a payload with all properties at depth 1 encrypted' })
    @ApiResponse({status: 200, description: 'Encryption calculated successfully', type: EncryptResponseDto })
    @ApiResponse({ status: 400, description: 'Invalid payload',})
    @ApiBody({ type: EncryptResponseDto })
     encrypt(@Body() payload: EncryptRequestDto): Record<string, string> {
        return this.encryptUseCase.execute(payload.body);
    }

    @Post("/decrypt")
    @HttpCode(200)
    @ApiOperation({ summary: 'Generate a decrypted values' })
    @ApiResponse({ status: 200, description: 'Signature calculated successfully', type: DecryptResponseDto})
    @ApiResponse({ status: 400,  description: 'Invalid payload',})
    @ApiBody({ type: DecryptRequestDto })
     decrypt(@Body() payload: DecryptRequestDto): JsonMap {
        return this.decryptUseCase.execute(payload.body);
    }
}