import { Controller,Post,UploadedFile,UseInterceptors,Res,Req, Put,Delete, UseGuards, Param, Get} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiHeader, ApiTags } from '@nestjs/swagger';
import {Express, Response, Request, response} from 'express'
import { AvatarUpload, RoleData, UpdateUser, UserId } from './entities/user.entity';
import { diskStorage } from 'multer';
import { formatFileName} from 'config/config';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { CurrentUser } from 'src/helps/util.decorator';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @Get('/all-user')
    @UseGuards(new RolesGuard(['admin']))
    @UseGuards(AuthGuard)
    @ApiHeader({name:'token',description:'token login'})
    async getAllUser(@Res() res:Response){
        return this.userService.getAllUser(res)
    }

    @Get('/all-user-by-role/:role')
    @UseGuards(new RolesGuard(['admin']))
    @UseGuards(AuthGuard)
    @ApiHeader({name:'token',description:'token login'})
    async getAllUserByRole(@Res() res:Response,@Param('role') role:number){
        return this.userService.getAllUserByRole(res,role)
    }

    @Get(':user_id')
    async getUserInfor(@Res() res:Response, @Param('user_id') user_id:number){
        return this.userService.getUserInfor(res,user_id);
    }

    @Put('update')
    @UseGuards(AuthGuard)
    @ApiHeader({name:'token',description:'token login'})
    @ApiBody({type:UpdateUser})
    async updateUser(@Req() req:Request,@Res() res:Response){
        return this.userService.updateUser(req,res);
    }

    @Post('upload-avatar')
    @UseGuards(AuthGuard)
    @ApiHeader({name:'token',description:'token login'})
    @ApiBody({type:AvatarUpload})
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('image',{
        storage:diskStorage({
            destination:(req,file,callback)=>{
                callback(null,process.cwd()+'/public/img')
            },
            filename:(req,file,callback)=>{
                const fileName = new Date().getTime() + formatFileName(file.originalname);
                callback(null,fileName.toString())
            }
        })
    }))
    async uploadAvatar(@UploadedFile() file:Express.Multer.File,@Req() req:Request,@Res() res:Response){
        return this.userService.uploadAvatar(file,req,res);
    }


    @Put('change-role')
    @UseGuards(new RolesGuard(['admin']))
    @UseGuards(AuthGuard)
    @ApiHeader({name:"token",description:'token login'})
    @ApiBody({type:RoleData})
    async changeRole(@CurrentUser() user:string,@Req() req:Request, @Res() res:Response){
        return this.userService.changeRole(req,res);
    }

    @Delete('delete-user/:user_id')
    @UseGuards(new RolesGuard(['admin']))
    @UseGuards(AuthGuard)
    @ApiHeader({name:"token",description:'Token login'})
    async removeUser(@Req() req:Request,@Res() res:Response,@Param('user_id') user_id:number){
        return this.userService.removeUser(req,res,user_id);
    }

}
