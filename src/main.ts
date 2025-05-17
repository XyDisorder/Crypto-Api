import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './config/app.module';
import {json} from "express";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1 Mo max per JSON request
  app.use(json({ limit: '1mb' }));

  /* ---------- Swagger ---------- */
  const config = new DocumentBuilder()
    .setTitle('TryRiot Home Challenge API')
    .setDescription('Endpoints available : encrypt / decrypt / sign / verify')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // URI = /api

  /* ---------- Run ---------- */
  // Validation stricte, transforme les payloads, masque l’objet d’origine
  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,            // delete unknown props
        forbidNonWhitelisted: true, // 400 if unknown props
        transform: true,            // payload → DTO automatically
        transformOptions: { enableImplicitConversion: true },
        forbidUnknownValues: true,  // refuse null/undefined for root level
        validationError: { target: false }, // don't expose internal object
      }),
  );
  await app.listen(3000);
  console.log('🚀  Server on http://localhost:3000');
  console.log('📚  Swagger on http://localhost:3000/api');
}
bootstrap();
