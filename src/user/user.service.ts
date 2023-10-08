import { Injectable } from '@nestjs/common';
import {Response,Request} from 'express'
import { errorCode, failCode, successCode } from 'config/responese'; 
import { formatFileName, getUserIdlByToken, models } from 'config/config';

@Injectable()
export class UserService {
    constructor(){}
    
    async updateUser(req:Request,res:Response){
        try {
            //lấy dử liệu thay đổi
            const {full_name,birthday,phone,gender} = req.body;
            let userUpdate = {};

            const birth_day = new Date(birthday);
            if(full_name) userUpdate = {...userUpdate,full_name};
            if(birth_day!==null) userUpdate = {...userUpdate,birth_day};
            if(phone) userUpdate = {...userUpdate,phone};
            if(gender) userUpdate = {...userUpdate,gender};
            
            //lấy id của user
            const id = await getUserIdlByToken(req.headers?.token.toString());
            
            if(userUpdate){
                //nếu thông tin hợp lệ
                await models.user.update({
                    where:id,
                    data:userUpdate
                })
                return successCode(res,{full_name,birth_day,gender,phone},'Cập nhật người dùng thành công!');
            }
            else{
                //nếu thông tin không hợp lệ
                return failCode(res,{userUpdate},401,'Thông tin không hợp lệ!');
            }
            
        } catch (error) {
            return errorCode(res,`Đã xảy ra lỗi! ${error}`)
        }
    }

    async uploadAvatar(file:Express.Multer.File,req:Request,res:Response){
        try {
            const id = await getUserIdlByToken(req.headers?.token.toString());
            await models.user.update({
                where:id,
                data:{avatar:file.filename}
            })
            return successCode(res,{filename:file.filename},'Upload avatar thành công!');
        } catch (error) {
            return errorCode(res,`Đã có lỗi! ${error}`)
        }
    }

    async changeRole(req:Request,res:Response){
        try {
            const {role} = req.body;
            const id = await getUserIdlByToken(req.headers?.token.toString());
            
            await models.user.update({
                where:id,
                data:{role:+role}
            })

            return successCode(res,{role},'Thay đổi role thành công!');
        } catch (error) {
            return errorCode(res,`Đã có lỗi! ${error}`)
        }
    }

    async removeUser(req:Request,res:Response){
        try {
            const id = await getUserIdlByToken(req.headers?.token.toString());
            if(id){
                await models.user.delete({
                    where:id
                })
                return successCode(res,{},'Xóa người dùng thành công!')
            }
        } catch (error) {
            return errorCode(res,`Đã có lỗi! ${error}`)
        }
    }

}
