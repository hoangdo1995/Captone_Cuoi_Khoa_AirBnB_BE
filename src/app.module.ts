import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt/dist';

@Module({
  imports: [
    UserModule,
    AuthModule,
    JwtModule.register({
      global:true,
      secret:process.env.SECRET_TOKEN,
      signOptions:{expiresIn:"1h"}
    })
  ],

  controllers: [AppController, AuthController, UserController],
  providers: [AppService, AuthService, UserService],
})
export class AppModule {}
