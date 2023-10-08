import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { request } from "http";
import { JwtService } from "@nestjs/jwt";
import { models } from "config/config";

const jwtService = new JwtService();

export const CurrentUser = createParamDecorator(
   async (data:unknown,context:ExecutionContext)=>{
        const req = context.switchToHttp().getRequest();
        const email = await jwtService.verify(req.headers?.token,{secret:process.env.SECRET_TOKEN})['email'];
        const user_role = await models.user.findFirst({
            where:{email},
            select:{
                role_user_roleTorole:{
                    select:{
                        role_name:true
                    }
                }
            }
        })
        
        return user_role.role_user_roleTorole.role_name ;
    }
)