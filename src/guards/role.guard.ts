import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { getUserIdlByToken, models } from "config/config";
import { request } from "http";
import { Observable } from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private roles:string[]){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        
        return this.roles.includes(request.CurrentUser.role.toLowerCase());
    }
}