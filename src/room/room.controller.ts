import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { RoomUpdate } from './entities/room.entity';
import { RoomService } from './room.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { RoomDto } from './dto/RoomDto.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { formatFileName } from 'config/config';

@ApiTags('room')
@Controller('room')
export class RoomController {
    constructor(private roomService:RoomService){}

    @Get('all-room')
    async getAllRoom(@Res() res:Response){
        return this.roomService.getAllRoom(res);
    }

    @Get('by-location/:location')
    async getRoomByLocation(@Res() res:Response,@Param('location') location:string){
        return this.roomService.getRoomByLocation(res,location);
    }

    @Get('by-key-word/:key')
    async getRoomByKey(@Res() res:Response, @Param('key') key:string){
        return this.roomService.getRoomByKey(res,key);
    }

    @Post('')
    @UseGuards(new RolesGuard(['leaser','admin']))
    @UseGuards(AuthGuard)
    @ApiHeader({name:'token',description:'Login token'})
    @ApiBody({type:RoomDto})
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
    async createRoom(@UploadedFile() file:Express.Multer.File,@Res() res:Response,@Req() req:Request,@Body() roomInfo:RoomDto){
        return this.roomService.createRoom(file,res,req,roomInfo);
    }

    @Put(':roomId')
    @UseGuards(new RolesGuard(['leaser','admin']))
    @UseGuards(AuthGuard)
    @ApiHeader({name:'token',description:'login token'})
    async updateRoom(@Req()req:Request,@Res() res:Response,@Body() roomInfo:RoomUpdate,@Param('roomId') id:number){
        return this.roomService.updateRoom(req,res,roomInfo,id);
    }

    @Delete(':roomId')
    @UseGuards(new RolesGuard(['leaser','admin']))
    @UseGuards(AuthGuard)
    @ApiHeader({name:'token',description:'login token'})
    async deleteRoom(@Req() req:Request, @Res() res:Response,@Param('roomId') roomId:number){
        return this.roomService.deleteRoom(req,res,roomId);
    }
    
}
