import { Inject, Injectable } from '@nestjs/common';
import { createHmac, timingSafeEqual } from 'crypto';
import { SignerPort } from '../../domain/ports/signer.port';
import { JsonValue } from '../../domain/shared/json.types';
import { HMAC_SECRET_TOKEN } from '../../domain/ports/tokens';
import {HmacUtils} from "./utils/hmacUtils";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class HmacSignerAdapter implements SignerPort {
  private readonly algorithm: string;
  constructor(
      @Inject(HMAC_SECRET_TOKEN) private readonly secret: string,
      config: ConfigService,
  ) {
    this.algorithm = config.get<string>('HMAC_ALGO', 'sha256');
  }

  /** Calculate HMAC-SHA256 of canonicalise json. */
  sign(data: JsonValue): string {
    const payload = HmacUtils.canonical(data);
    return createHmac(this.algorithm, this.secret).update(payload).digest('hex');
  }

  /** Verify if a signature corresponds to the payload. */
  verify(data: JsonValue, signature: string): boolean {
    const expected = this.sign(data);

    const a = Buffer.from(expected, 'hex');
    const b = Buffer.from(signature, 'hex');

    // if lenght are not equal -> false mandatory
    if (a.length !== b.length) return false;

    return timingSafeEqual(a, b);
  }
}
