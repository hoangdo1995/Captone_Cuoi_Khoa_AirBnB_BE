import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { Comment } from './entities/comment.entity';
import { models } from 'config/config';
import { errorCode, failCode, successCode } from 'config/responese';
import { DeleteComment } from './entities/deleteComment.entity';


@Injectable()
export class CommentService {

    async getCommentByRoom(res:Response, roomId:number){
        try {
            //kiểm tra tồn tại của roomId
            const checkRoomId = await models.room.findFirst({
                where:{id:+roomId}
            })
            //nếu room tồn tại
            if(checkRoomId){
                const data = await models.comment.findMany({
                    where:{room_id:+roomId}
                });
                successCode(res,data,'Lấy danh sách comment của phòng thành công!');
            }
            else{
                //nếu room không tồn tại!
                failCode(res,{roomId},401,'Room không tồn tại!');
            }
        } catch (error) {
            return errorCode(res,`Đã có lỗi! ${error}`);
        }
    }


    async createComment(res:Response, commentInfo:Comment){
        try {
            //lấy thông tin comment
            const {room_id,rate_comment,user_id,content,date} = commentInfo;
            //comment
            //kiểm tra user có tồn tại
            const checkUser = await models.user.findFirst({where:{id:user_id}})
            if(checkUser){
                //nếu có
                //kiểm tra room_id có tồn tại
                const checkRoom = await models.room.findFirst({where:{id:room_id}})
                if(checkRoom){
                    //nếu có
                    await models.comment.create({
                        data:{room_id,rate_comment,user_id,content,date}
                    })
                    return successCode(res,{commentInfo},'Comment thành công!');
                }
                else{
                    //nếu không
                    return failCode(res,{room_id},401,'room không tồn tại!')
                }
            }
            else{
                //nếu user_id không tồn tại
                return failCode(res,{user_id},401,'User không tồn tại!')
            }
        } catch (error) {
            return errorCode(res,`Đã có lỗi! ${error}`);
        }
    }

    async deleteComment(req:Request,res:Response,commentId:number){
        try {
            //kiểm tra comment id
            console.log(commentId);
            
            const checkComment = await models.comment.findFirst({where:{id:+commentId}})
            console.log(checkComment);
            
            //nếu comment tồn tại
            if(checkComment){
                await models.comment.delete({where:{id:+commentId}})
                return successCode(res,{commentId},'Xóa bình luận thành công!')
            }
            else{
                return failCode(res,{commentId},401,'comment không tồn tại!')
            }
            
        } catch (error) {
            return errorCode(res,`Đã có lỗi! ${error}`);
        }
    }
}
