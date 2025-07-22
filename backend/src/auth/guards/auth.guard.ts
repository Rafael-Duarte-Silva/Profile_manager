import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly jwtSecret: string;
  private readonly expiresIn: number;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET') ?? '';
    this.expiresIn = parseInt(
      this.configService.get<string>('JWT_EXPIRATION_TIME') || '0',
    );
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token: string = request.signedCookies['jwt'];
    if (!token) {
      this.setCookieIsLoggedIn(context);
      throw new UnauthorizedException();
    }

    try {
      const payload: unknown = await this.jwtService.verifyAsync(token, {
        secret: this.jwtSecret,
      });

      request['user'] = payload;
    } catch {
      this.setCookieIsLoggedIn(context);
      throw new UnauthorizedException();
    }

    return true;
  }

  private setCookieIsLoggedIn(context: ExecutionContext): void {
    const response: Response = context.switchToHttp().getResponse();
    response.cookie('isLoggedIn', 'false', {
      maxAge: this.expiresIn * 1000,
    });
  }
}
