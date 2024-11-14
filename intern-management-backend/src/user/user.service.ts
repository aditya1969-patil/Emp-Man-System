import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Create a new user
  async createUser(name: string, email: string, password: string, role: string = 'user') {
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = this.userRepository.create({
        name,
        email,
        password: hashedPassword, // Store the hashed password
        role,
      });

    // Log before saving
    console.log('Creating user:', user);
      // Save and return the new user in the database
      return await this.userRepository.save(user);
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Error hashing password or saving user');
    }
  }

  // Find a user by email
  async findUserByEmail(email: string) {
    try {
      return await this.userRepository.findOne({ where: { email } });
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw new Error('Error querying the database');
    }
  }

  // Validate user's password
  async validatePassword(email: string, password: string): Promise<boolean> {
    try {
      const user = await this.findUserByEmail(email);
      if (user) {
        return await bcrypt.compare(password, user.password); // Compare plain password with the hashed password
      }
      return false; // Return false if the user doesn't exist
    } catch (error) {
      console.error('Error validating password:', error);
      return false;
    }
  }
}
