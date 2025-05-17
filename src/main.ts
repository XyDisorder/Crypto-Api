import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './config/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* ---------- Swagger ---------- */
  const config = new DocumentBuilder()
    .setTitle('TryRiot Home Challenge API')
    .setDescription('Endpoints available : encrypt / decrypt / sign / verify')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // URI = /api

  /* ---------- Run ---------- */
  await app.listen(3000);
  console.log('🚀  Server on http://localhost:3000');
  console.log('📚  Swagger on http://localhost:3000/api');
}
bootstrap();
