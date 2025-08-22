import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(), // Load environment variables from `.env`
    PassportModule.register({ defaultStrategy: 'jwt' }), // Configure Passport with default JWT strategy
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'JWT_SECRET', // Use environment variable or fallback value
      signOptions: { expiresIn: '1h' }, // Token expiry time
    }),
  ],
  providers: [JwtStrategy], // Add JwtStrategy for validating JWT tokens
  exports: [JwtModule, PassportModule], // Export modules for use in other parts of the app
})
export class AuthModule {}
