import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

/* ---------- Ports (domaine) ---------- */
import { EncrypterPort } from '../domain/ports/encrypter.port';
import { SignerPort }    from '../domain/ports/signer.port';

/* ---------- Adapters (infrastructure) ---------- */
import { Base64EncrypterAdapter } from '../infrastructure/crypto/base64.encrypter.adapter';
import { HmacSignerAdapter }      from '../infrastructure/crypto/hmac.signer.adapter';

/* ---------- Use-cases (application) ---------- */
import { EncryptUseCase } from '../application/use-cases/encrypt.uc';
import { DecryptUseCase } from '../application/use-cases/decrypt.uc';
import { SignUseCase }    from '../application/use-cases/sign.uc';
import { VerifyUseCase }  from '../application/use-cases/verify.uc';

/* ---------- Controllers (interfaces HTTP) ---------- */
import { EncryptController } from '../interfaces/http/encrypt.controller';
import { SignController }    from '../interfaces/http/sign.controller';

@Module({
    /* charge .env et rend ConfigService disponible partout */
    imports: [ConfigModule.forRoot({ isGlobal: true })],

    /* Les contrôleurs (vide pour l’instant, ajoute-les plus tard) */
    controllers: [EncryptController, SignController],

    /* Fournisseurs disponibles à l’injection */
    providers: [
        /* ---- Ports → Adapters ---- */
        { provide: EncrypterPort, useClass: Base64EncrypterAdapter },
        { provide: SignerPort,    useClass: HmacSignerAdapter      },

        /* ---- Use-cases ---- */
        EncryptUseCase,
        DecryptUseCase,
        SignUseCase,
        VerifyUseCase,
    ],
})
export class AppModule {}
