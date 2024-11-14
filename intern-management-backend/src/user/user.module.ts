import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../.env' });  // Ensure dotenv is loaded with the correct path

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),  // Register the User entity
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,  // Use secret from environment
      signOptions: { expiresIn: '60m' },  // Optional: Set token expiration time
    }),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {
  constructor() {
    // Log secret to check if it's loaded correctly
    console.log('JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY);
  }
}
