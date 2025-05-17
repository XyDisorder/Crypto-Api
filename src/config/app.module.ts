import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

/* ---------- Ports (domaine) ---------- */
import { EncrypterPort } from '../domain/ports/encrypter.port';
import { SignerPort } from '../domain/ports/signer.port';

/* ---------- Adapters (infrastructure) ---------- */
import { Base64EncrypterAdapter } from '../infrastructure/crypto/base64.encrypter.adapter';
import { HmacSignerAdapter } from '../infrastructure/crypto/hmac.signer.adapter';

/* ---------- Use-cases (application) ---------- */
import { EncryptUseCase } from '../application/use-cases/encrypt.uc';
import { DecryptUseCase } from '../application/use-cases/decrypt.uc';
import { SignUseCase } from '../application/use-cases/sign.uc';
import { VerifyUseCase } from '../application/use-cases/verify.uc';

/* ---------- Controllers (interfaces HTTP) ---------- */
import { EncryptController } from '../interfaces/http/encrypt.controller';
import { SignController } from '../interfaces/http/sign.controller';
import { randomBytes } from 'crypto';
import { HMAC_SECRET_TOKEN } from '../domain/ports/tokens';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],

  controllers: [EncryptController, SignController],

  /* Providers available to inject */
  providers: [
    /* ---- Ports → Adapters ---- */
    { provide: EncrypterPort, useClass: Base64EncrypterAdapter },
    { provide: SignerPort, useClass: HmacSignerAdapter },

    /* ---- Use-cases ---- */
    EncryptUseCase,
    DecryptUseCase,
    SignUseCase,
    VerifyUseCase,

    /* ---- HMAC ---- */
    {
      provide: HMAC_SECRET_TOKEN,
      useFactory: (config: ConfigService) =>
        config.get<string>('HMAC_SECRET') ?? // env or default :
        randomBytes(32).toString('hex'), // random key aléatoire
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
