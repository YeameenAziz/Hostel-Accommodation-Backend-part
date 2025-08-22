import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Custom JWT Authentication Guard
 * This guard ensures that routes are protected and require a valid JWT token.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
