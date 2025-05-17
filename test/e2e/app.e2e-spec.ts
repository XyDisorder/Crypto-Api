import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request = require('supertest');
import {AppModule} from "../../src/config/app.module";

describe('Tryriot Home Challenge API (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    const payload = { name: 'John', age: 30 };

    // change these if your controllers return 201 instead of 200
    const STATUS_ENCRYPT = 200;
    const STATUS_DECRYPT = 200;
    const STATUS_SIGN    = 200;

    it('/encrypt -> /decrypt round-trip', async () => {
        const enc = await request(app.getHttpServer())
            .post('/encrypt')
            .send(payload)
            .expect(STATUS_ENCRYPT);

        await request(app.getHttpServer())
            .post('/decrypt')
            .send({ data: enc.body.data })
            .expect(200)
    });

    it('/sign -> /verify happy path', async () => {
        const { body } = await request(app.getHttpServer())
            .post('/sign')
            .send(payload)
            .expect(STATUS_SIGN);

        await request(app.getHttpServer())
            .post('/verify')
            .send({ signature: body.signature, data: payload })
            .expect(204);
    });

    it('/verify should fail with tampered data', async () => {
        const { body } = await request(app.getHttpServer())
            .post('/sign')
            .send(payload);

        await request(app.getHttpServer())
            .post('/verify')
            .send({ signature: body.signature, data: { ...payload, age: 31 } })
            .expect(400);
    });
});
