import { Controller, Post,Body, Res, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthSignUp } from './entities/AuthSignUp.entity';
import { AuthService } from './auth.service';
import { AuthLogin } from './entities/AuthLogin.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){
    }
    @ApiBody({type:AuthSignUp})
    @Post('signup')
    async signUp(@Res() res:Response,@Body() dataSignUp:AuthSignUp){
        return this.authService.signUp(res,dataSignUp);
    }

    @ApiBody({type:AuthLogin})
    @Post('login')
    async login(@Res() res:Response,@Body() authLogin:AuthLogin){
        return this.authService.login(res,authLogin);
    }
}
