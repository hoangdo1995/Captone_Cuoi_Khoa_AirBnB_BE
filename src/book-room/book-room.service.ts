import { Injectable } from '@nestjs/common';
import { BookType } from './dto/roomBook.dto';
import { errorCode, failCode, successCode } from 'config/responese';
import { Request, Response } from 'express';
import { checkDateOverlap, getUserIdlByToken, models } from 'config/config';


@Injectable()
export class BookRoomService {
    async bookRoom(req:Request,res:Response,bookInfo:BookType){
        try {
            //kiểm tra thông tin phòng
            const {room_id,start_day,end_day,guest_count} = bookInfo;
            const user_id = await getUserIdlByToken(req.headers.token.toString());
            const checkRoom = await models.room.findFirst({
                where:{
                    id:+room_id
                }
            })
            if(checkRoom){
                //kiêm tra phù hợp thời gian
                const bookList = await models.room_book.findMany({
                    where:{room_id:+room_id}
                })
                let checkBook = true;
                bookList.forEach(book => {
                    if(checkDateOverlap(new Date(book.start_day),new Date(book.end_day),new Date(start_day), new Date(end_day))){
                        checkBook = false;
                    }
                });

                if(checkBook){
                    //đặt phòng
                    await models.room_book.create({
                        data:{room_id,start_day,end_day,guest_count,user_id:+user_id.id}
                    })
                    return successCode(res,{},'Đặt phòng thành công!');
                }
                else{
                    return failCode(res,{},401,'Phòng đã có người đặt trong thời gian này');
                }   
            }
            else{
                return failCode(res,{room_id},401,'Phòng không tồn tại!')
            }
        } catch (error) {
            return errorCode(res,`Đã có lỗi! ${error}`);
        }
    }

    async deleteBook(req:Request, res:Response,bookId){
        try {
            // kiểm tra quyền xóa
            const user_id = await getUserIdlByToken(req.headers?.token.toString());
            const checkRole = await models.room_book.findFirst({
                where:{
                    user_id:+user_id.id,
                    id:+bookId
                }
            })
            
            if(checkRole || req['CurrentUser'].role.toLowerCase() ==='admin'|| req['CurrentUser'].role.toLowerCase() ==='leaser'){
                await models.room_book.delete({
                    where:{
                        id:+bookId
                    }
                })
                return successCode(res,{},'Xóa đặt phòng thành công!')
            }
            else{
                return failCode(res,{},403,'Không đủ quyền xóa!');
            }
            
        } catch (error) {
            return errorCode(res,`Đã có lỗi! ${error}`);
        }
    }

    async updateBook(req:Request,res:Response,updateInfo:BookType,bookId:number){
        try {
            const user_id = await getUserIdlByToken(req.headers?.token.toString());
            const checkBook = await models.room_book.findFirst({
                where:{
                    user_id:+user_id.id,
                    id:+bookId
                }
            })
            if(checkBook){
                //kiêm tra phù hợp thời gian
                const {room_id,start_day,end_day} = updateInfo;
                const bookList = await models.room_book.findMany({
                    where:{room_id:+room_id}
                })
                let checkBook = true;
                bookList.forEach(book => {
                    if(checkDateOverlap(new Date(book.start_day),new Date(book.end_day),new Date(start_day), new Date(end_day))){
                        checkBook = false;
                    }
                });
                if(checkBook){
                    await models.room_book.update({
                        where:{
                            user_id:+user_id.id,
                            id:+bookId
                        },
                        data:updateInfo
                    })
                    return successCode(res,{updateInfo},'Update đặt lịch thành công!');
                }
                else{
                    return failCode(res,{start_day,end_day},401,'Thời gian đã có người đặt lịch!');
                }
            }
            else{
                return failCode(res,{},401,'Thông tin update không đúng!');
            }

        } catch (error) {
            return errorCode(res,`Đã có lỗi! ${error}`);
        }
    }

    async getBook(res:Response,user_id:number){
        try {
            const data = await models.room_book.findMany({where:{user_id:+user_id}})
            return successCode(res,{data},'Lấy dử liệu đặt phòng thành công!')
        } catch (error) {
            return errorCode(res,`Đã có lỗi! ${error}`);
        }
    }
}
