// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],  // Export DatabaseService for other modules to use
})
export class DatabaseModule {}
