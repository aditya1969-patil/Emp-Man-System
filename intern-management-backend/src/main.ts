import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../.env' });  // Adjust the relative path to point to the parent folder

console.log('JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
