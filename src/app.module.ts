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
import { CommentController } from './comment/comment.controller';
import { CommentService } from './comment/comment.service';
import { CommentModule } from './comment/comment.module';
import { LocationController } from './location/location.controller';
import { LocationService } from './location/location.service';
import { RoomController } from './room/room.controller';
import { RoomService } from './room/room.service';
import { BookRoomController } from './book-room/book-room.controller';
import { BookRoomService } from './book-room/book-room.service';

@Module({
  imports: [
    UserModule,
    AuthModule,
    JwtModule.register({
      global:true,
      secret:process.env.SECRET_TOKEN,
      signOptions:{expiresIn:"1h"}
    }),
    CommentModule
  ],

  controllers: [AppController, AuthController, UserController, CommentController, LocationController, RoomController, BookRoomController],
  providers: [AppService, AuthService, UserService, CommentService, LocationService, RoomService, BookRoomService],
})
export class AppModule {}
