import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';

@Controller('api/user') // Add 'api' to the route
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Route to handle user login
  @Post('login')
  async loginUser(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      const user: User = await this.userService.findUserByEmail(email);

      if (user && await this.userService.validatePassword(email, password)) {
        const payload = { userId: user.id, email: user.email };
        const token = await this.jwtService.sign(payload);

        return { message: 'Login successful', user: { ...user, token } };
      } else {
        return { message: 'Invalid credentials' };
      }
    } catch (error) {
      console.error('Error during login:', error);
      return { message: 'Internal server error' };
    }
  }

  // Route to handle user registration
  @Post('register')
  async registerUser(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      let user: User = await this.userService.findUserByEmail(email);

      if (user) {
        return { message: 'User already exists' };
      }

      user = await this.userService.createUser(
        'Default Name', // You can adjust this or add another input field for the name
        email,
        password,
        'user',
      );
      // Log to check if user creation was successful
      console.log('User created successfully:', user);

      // Generate the JWT token
      const payload = { userId: user.id, email: user.email };
      const token = await this.jwtService.sign(payload);

        // Log the generated token
        console.log('Generated JWT token:', token);

      return { message: 'Registration successful', user: { ...user, token } };
    } catch (error) {
      console.error('Error during registration:', error);
    return { message: 'Internal server error', error: error.message }; // Provide more detailed error info
    }
  }
}
