import { Controller,Post, Res, Body, UseGuards, Delete, Param, Req } from '@nestjs/common';
import { Response } from 'express';
import { Comment } from './entities/comment.entity';
import { ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { CommentService } from './comment.service';
import { DeleteComment } from './entities/deleteComment.entity';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
    constructor(private commentService:CommentService){}


    @Post('create')
    @UseGuards(new RolesGuard(['guest']))
    @UseGuards(AuthGuard)
    @ApiHeader({name:'token',description:'Token login'})
    async createComment(@Res() res:Response, @Body()commentInfo:Comment){
        return this.commentService.createComment(res,commentInfo);
    }

    @Delete('delete/:commentId')
    @UseGuards(new RolesGuard(['guest','admin']))
    @UseGuards(AuthGuard)
    @ApiHeader({name:'token',description:'Token login'})
    async deleteComment(@Req() req:Request,@Res() res:Response,@Param('commentId')commentId:number){
        return this.commentService.deleteComment(req,res,commentId);
    }
}
