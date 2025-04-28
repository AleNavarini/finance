import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Finance API')
    .setDescription('This is the finance api for the portfolio management app')
    .setVersion('1.0')
    .addTag('users', 'Operations related to users')
    .addTag('assets', 'Operations related to assets')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // Swagger UI available at /api

  await app.listen(3000);
}
bootstrap();
