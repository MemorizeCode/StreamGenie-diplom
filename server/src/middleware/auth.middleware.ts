import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  async use(req: any, res: any, next: (error?: any) => void) {
    let header = req.headers.authorization;
    if (!header) {
      res.status(401).send({ message: 'Header not' });
    }
    const token = header.split(' ')[1];
    try {
      const decode = await this.jwtService.verify(token);
      req.user = decode;
      next();
    } catch (err) {
      return res.status(401).send({ message: 'Неверный токен' });
    }
  }
}
