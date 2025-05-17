import { Injectable, Inject } from '@nestjs/common';
import { createHmac, timingSafeEqual } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { HMAC_SECRET_TOKEN } from '../../domain/ports/tokens';   // token déjà créé
import {canonicalize, JsonValue} from '../../domain/shared/json.types';
import {SignerPort} from "../../domain/ports/signer.port";

/* White list */
const ALLOWED = ['sha256', 'sha384', 'sha512'] as const;
type AllowedAlgo = typeof ALLOWED[number];

@Injectable()
export class HmacSignerAdapter implements SignerPort {
  private readonly algo: AllowedAlgo;

  constructor(
      @Inject(HMAC_SECRET_TOKEN) private readonly secret: string,
      config: ConfigService,
  ) {
    if (this.secret.length < 32) // security : 256 bits
      throw new Error('HMAC_SECRET must be at least 32 hex chars (256 bits)');

    // take algo from env, default to sha256
    const envAlgo = (config.get<string>('HMAC_ALGO', 'sha256') as string).toLowerCase();
    if (!ALLOWED.includes(envAlgo as AllowedAlgo))
      throw new Error(`HMAC_ALGO must be one of ${ALLOWED.join(', ')}`);

    this.algo = envAlgo as AllowedAlgo;
  }

  sign(data: JsonValue): string {
    const canonical = canonicalize(data);
    return createHmac(this.algo, this.secret).update(canonical).digest('hex');
  }

  verify(data: JsonValue, sig: string): boolean {
    const expected = this.sign(data);
    const a = Buffer.from(expected, 'hex');
    const b = Buffer.from(sig, 'hex');
    return a.length === b.length && timingSafeEqual(a, b);
  }
}
