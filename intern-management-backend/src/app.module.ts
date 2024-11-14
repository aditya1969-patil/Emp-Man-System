// src/app.module.ts
import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';  // Import DatabaseModule
import { DatabaseService } from './database/database.service';  // Import DatabaseService
import { User } from './user/user.entity';

@Module({
  imports: [
    DatabaseModule,  // Import DatabaseModule to make DatabaseService available
    TypeOrmModule.forRootAsync({
      imports: [DatabaseModule],
      useFactory: async (databaseService: DatabaseService) => {
        // Ensure the database is created before TypeORM connects
        await databaseService.createDatabase();
        
        return {
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: process.env.DB_USER || 'postgres',
          password: process.env.DB_PASSWORD || 'sanvik',
          database: 'intern_management_system',
          entities: [User],
          synchronize: true,
          logging: true,
        };
      },
      inject: [DatabaseService],  // Inject DatabaseService into the factory
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly databaseService: DatabaseService) {}

  async onModuleInit() {
    // Ensures the database creation logic is always called
    await this.databaseService.createDatabase();
  }
}
