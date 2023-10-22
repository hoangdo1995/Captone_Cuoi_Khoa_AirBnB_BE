import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiHeaders, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { BookType } from './dto/roomBook.dto';
import { BookRoomService } from './book-room.service';
import {  Response, Request } from 'express';

@ApiTags('Book-Room')
@Controller('book-room')
export class BookRoomController {
    constructor(private bookRoomService:BookRoomService){}

    @Post('')
    @UseGuards(new RolesGuard(['guest']))
    @UseGuards(AuthGuard)
    @ApiHeader({name:'token',description:'Token login'})
    async bookRoom(@Req() req:Request,@Res() res:Response,@Body() bookInfo:BookType){
        return this.bookRoomService.bookRoom(req,res,bookInfo);
    }

    @Delete(':bookId')
    @UseGuards(new RolesGuard(['guest','admin','leaser']))
    @UseGuards(AuthGuard)
    @ApiHeader({name:'token',description:'Token login'})
    async deleteBook(@Req() req:Request,@Res() res:Response,@Param('bookId') bookId:number){
        return this.bookRoomService.deleteBook(req,res,bookId);
    }

    @Put(':bookId')
    @UseGuards(new RolesGuard(['guest']))
    @UseGuards(AuthGuard)
    @ApiHeader({name:'token',description:'Token login'})
    @ApiBody({type:BookType})
    async updateBook(@Req() req:Request,@Res() res:Response,@Body() updateInfo:BookType,@Param('bookId') bookId:number){
        return this.bookRoomService.updateBook(req,res,updateInfo,bookId);
    }

    @Get(':user_id')
    @UseGuards(new RolesGuard(['guest','admin','leaser']))
    @UseGuards(AuthGuard)
    @ApiHeader({name:'token',description:'Token login'})
    async getBook(@Res() res:Response,@Param('user_id') user_id:number){
        return this.bookRoomService.getBook(res,user_id)
    }
}
