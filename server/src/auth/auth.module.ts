import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'hdfhfheryscngwrtwrbbefgy3347n34b3483fdnNKJKHUISDBAJDBSBDSK',
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,PrismaService],
  exports:[PrismaService]
})
export class AuthModule {}
