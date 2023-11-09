import { Injectable,NestMiddleware } from '@nestjs/common';
import { Request, Response,NextFunction } from 'express';
import { AuthSignUp } from './entities/AuthSignUp.entity';
import { models } from 'config/config';
import { errorCode, failCode, successCode } from 'config/responese';
import * as bcrypt from 'bcrypt';
import { AuthLogin } from './entities/AuthLogin.entity';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(private jwtService:JwtService){}
    async signUp(res:Response,dataSignup:AuthSignUp){
        try {
            const {email,password,full_name,gender,role} = dataSignup;
            //chăn người dùng thêm quyền admin
            if(role===1){
                return failCode(res,{},403,`Yêu cầu quyền admin để thực hiện`);
            }
            //kiểm tra email
            const checkEmail = await models.user.findFirst({where:{email}})
            //nêu email tồn tại
            if(checkEmail){
                return failCode(res,{email},401,'Email đã tồn tại!');
            }
            else{
                //nếu email chưa tồn tại
                //mã hóa password'
                const bcryptPass:string = await bcrypt.hash(password,10);
                await models.user.create({data:{email,full_name,password:bcryptPass,gender,role}})
                return successCode(res,{email},'Tạo tài khoản thành công!');
            }

        } catch (error) {
            return errorCode(res,`Đã xảy ra lỗi! ${error}`);
        }
    }

    async login(res:Response,authLogin:AuthLogin){
        try {
            const {email,password} = authLogin;
            //kiểm tra email
            const checkEmail = await models.user.findFirst({where:{email}});
            if(checkEmail){
                //nếu email đúng
                //kiểm tra mật khẩu
                bcrypt.compare(password,checkEmail.password,(err,result)=>{
                    if(result){
                        //nếu mật khẩu đúng
                        //tạo token
                        const token = this.jwtService.sign({email});
                        const {password,...userInfor} = checkEmail;
                        const data = {...userInfor,token};
                        return successCode(res,data,'Đăng nhập thành công!');
                    }
                    else{
                        // nếu mật khẩu sai 
                        return failCode(res,{email},401,'Sai mật khẩu')
                    }
                });
            }
            else{
                //nếu email sai
                failCode(res,{email},401,'Email chưa đăng ký!');
            }
            
        } catch (error) {
            return errorCode(res,`Đã xãy ra lỗi!`);
        }
    }
}
