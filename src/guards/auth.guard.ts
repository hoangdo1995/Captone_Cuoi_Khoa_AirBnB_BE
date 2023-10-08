import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { models } from "config/config";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtService:JwtService){}
    async canActivate(context: ExecutionContext): Promise<boolean>{
        const request = context.switchToHttp().getRequest();
        try {
            const token = request.headers?.token.toString();
            const checkToken = this.jwtService.verify(token);
            if(checkToken){
                let user = await models.user.findFirst({
                    where:{email:checkToken.email},
                    select:{
                        email:true,
                        full_name:true,
                        birth_day:true,
                        avatar:true,
                        phone:true,
                        role_user_roleTorole:{
                            select:{
                                role_name:true
                            }
                        }
                    }
                })
                
                const currentUser = {
                    email: user.email,
                    full_name: user.full_name,
                    birth_day: user.birth_day,
                    avatar: user.avatar,
                    phone: user.phone,
                    role: user.role_user_roleTorole?.role_name // Sử dụng optional chaining để tránh lỗi nếu mối quan hệ không có giá trị.
                  };
                request.CurrentUser = currentUser;
                return true
            }
        } catch (error) {
            return false;
        }   
    }
}