import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { EncryptUseCase } from '../../application/use-cases/encrypt.uc';
import { DecryptUseCase } from '../../application/use-cases/decrypt.uc';
import { JsonMap } from '../../domain/shared/json.types';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class EncryptController {
  constructor(
    private readonly encryptUseCase: EncryptUseCase,
    private readonly decryptUseCase: DecryptUseCase,
  ) {}

  @Post('/encrypt')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Generate a payload with all properties at depth 1 encrypted',
  })
  @ApiResponse({
    status: 200,
    description: 'Encryption calculated successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid payload' })
  @ApiBody({ type: Object, description: 'Json payload to encrypt' })
  encrypt(@Body() dto: JsonMap): JsonMap {
    return this.encryptUseCase.execute(dto);
  }

  @Post('/decrypt')
  @HttpCode(200)
  @ApiOperation({ summary: 'Generate a decrypted values' })
  @ApiResponse({
    status: 200,
    description: 'Signature calculated successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid payload' })
  @ApiBody({ type: Object, description: 'Json payload to decrypt' })
  decrypt(@Body() dto: JsonMap): JsonMap {
    return this.decryptUseCase.execute(dto);
  }
}
