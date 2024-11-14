import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService {
  private pool: Pool;

  constructor() {
    // Connect to PostgreSQL Server (connect to the default "postgres" database)
    this.pool = new Pool({
      user: process.env.DB_USER || 'postgres',  // Use environment variable for better security
      host: 'localhost',
      database: 'postgres', // Connect to the default "postgres" database first
      password: process.env.DB_PASSWORD || 'sanvik',  // Use environment variable for password
      port: 5432,
    });
  }

  // Function to create the database if it does not exist
  async createDatabase() {
    const dbName = 'intern_management_system';  // Name of the database to create
    try {
      // Check if the database exists
      const res = await this.pool.query(`SELECT 1 FROM pg_database WHERE datname='${dbName}'`);
      if (res.rowCount === 0) {
        // If the database doesn't exist, create it
        console.log(`Database "${dbName}" does not exist. Creating...`);
        await this.pool.query(`CREATE DATABASE ${dbName}`);
        console.log(`Database "${dbName}" created successfully.`);
      } else {
        console.log(`Database "${dbName}" already exists.`);
      }

      // Close the current connection pool to the "postgres" database
      await this.pool.end();

      // Reconnect to the newly created or existing database
      this.pool = new Pool({
        user: process.env.DB_USER || 'postgres',
        host: 'localhost',
        database: dbName,  // Connect to the "intern_management_system" database
        password: process.env.DB_PASSWORD || 'sanvik',
        port: 5432,
      });
      console.log(`Connected to the database "${dbName}" successfully.`);
    } catch (error) {
      console.error('Error checking or creating the database:', error);
    }
  }

  // Optional: Method to close the database connection pool
  async closeConnection() {
    await this.pool.end();
    console.log('Connection pool closed.');
  }
}
