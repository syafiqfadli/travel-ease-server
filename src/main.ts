import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT || 2811).then(() => {
    console.log(`Listening to port ${process.env.PORT || 2811}...`);
  });
}
bootstrap();
