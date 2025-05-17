import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { JsonValue } from '../../domain/shared/json.types';
import { SignUseCase } from '../../application/use-cases/sign.uc';
import { VerifyUseCase } from '../../application/use-cases/verify.uc';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SignResponseDto, VerifyRequestDto } from './dto/sign.dto';

@Controller()
export class SignController {
  constructor(
    private readonly signUseCase: SignUseCase,
    private readonly verifyUseCase: VerifyUseCase,
  ) {}

  @Post('/sign')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Generate a Json payload with a unique signature property',
  })
  @ApiResponse({
    status: 200,
    description: 'Signature calculated successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid payload' })
  @ApiBody({ type: Object, description: 'Json payload to sign' })
  sign(@Body() dto: JsonValue): SignResponseDto {
    const signature = this.signUseCase.execute(dto);
    return { signature };
  }

  @Post('verify')
  @HttpCode(204)
  @ApiOperation({ summary: 'Verify signature validity' })
  @ApiResponse({ status: 204, description: 'Signature is valid' })
  @ApiResponse({ status: 400, description: 'Signature is invalid' })
  @ApiBody({ type: Object, description: 'Json payload to verify' })
  verify(@Body() dto: VerifyRequestDto): boolean {
    const isValid = this.verifyUseCase.execute(dto.data, dto.signature);
    if (!isValid) {
      throw new BadRequestException('Invalid signature');
    }

    return isValid;
  }
}
