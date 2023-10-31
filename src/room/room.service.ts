import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { RoomUpdate } from './entities/room.entity';
import { errorCode, failCode, successCode } from 'config/responese';
import { getUserIdlByToken, models } from 'config/config';
import { RoomDto } from './dto/RoomDto.dto';
import { LocationService } from 'src/location/location.service';

@Injectable()
export class RoomService {
    constructor(private locationService:LocationService){}

    async getAllRoom(res:Response){
        try {
            const data = await models.room.findMany();
            const result = data.map(room=>{
                return {...room,image:process.cwd()+'/public/img/'+room.image}
            })
            return successCode(res,result,'Lấy tất cả room thành công!');
        } catch (error) {
            return errorCode(res,`Đã xảy ra lỗi! ${error}`);
        }
    }

    async getRoomByLocation(res:Response,location:string){
        try {
            const data = await models.room.findMany({
                where:{location_id:+location}
            })
            if(data){
                return successCode(res,data,'lấy danh sách phòng thành công!')
            }
            else{
                return failCode(res,location,401,'Không có phòng!')
            }
            
        } catch (error) {
            return errorCode(res,`Đã xảy ra lỗi! ${error}`);
        }
    }

    async getRoomByKey(res:Response, key:string){
        try {
            let result = [];
            //lấy danh sách phòng qua name
            const rooms1 =  await models.room.findMany({
                where:{
                    room_name:{
                        contains:key.toLowerCase()
                    }
                }
            })
            result = [...result,...rooms1];
            //lấy danh sách phòng theo tên tỉnh thanh
            const listLocation = await models.location.findMany({
                where:{
                    location_name:{
                        contains:key.toLowerCase()
                    }
                }
            });
            for(const location of listLocation){
                const rooms = await models.room.findMany({where:{location_id:+location.id}})
                result = [...result,...rooms];
            }

            // lọc các giá trị trùng lặp
            const seen = new Set();
            const uniqueArray = result.filter((item) => {
                const id = item.id;
                if (!seen.has(id)) {
                    seen.add(id);
            return true;
                }
                return false;
            });
            return successCode(res,uniqueArray,'Tải danh sách phòng thành công!');
        } catch (error) {
            return errorCode(res,`Đã xảy ra lỗi! ${error}`);
        }
    }

    async createRoom(file:Express.Multer.File,res:Response,req:Request,roomInfo:RoomDto){
        try {
            //lấy thông tin room
            const {room_name,living_room,bedroom,bed,bathroom, description,cost,washing_machine,iron,televition,air_condition,wifi,parking,kitchen,image,location_id} = roomInfo;
            //kiểm tra location_id có tồn tại không
            const checkLocation = await models.location.findMany({
                where:{id:+location_id},
                select:{
                    id:true,
                    location_name:true
                }
            });
            
            if(checkLocation.length > 0){
                //nếu có tồn tại
                //kiểm tra user có tồn tại
                const userId = await getUserIdlByToken(req.headers?.token.toString());
                
                const userCreate = await models.user.findFirst({where:{id:+userId.id}});
                if(userCreate){
                    //nếu tồn tại
                    await models.room.create({data:{room_name,living_room:+living_room,bedroom:+bedroom,bed:+bed,bathroom:+bathroom, description,cost:+cost,washing_machine:!!washing_machine,iron:!!iron,televition:!!televition,air_condition:!!air_condition,wifi:!!wifi,parking:!!parking,kitchen:!!kitchen,location_id:+location_id,user_id:userCreate.id,image:file.filename}});
                    return successCode(res,{room_name,location_id},'Tạo phòng cho thuê thành công');
                }
                else{
                    //nếu không
                    return failCode(res,{userCreate},401,'Mã người dùng không tồn tại!');
                }
                
            }
            else{
                return failCode(res,{},401,'location không tồn tại!')
            }
        } catch (error) {
            console.log(error);
            
            return errorCode(res,`Đã xảy ra lỗi! ${error}`)
        }
    }

    async updateRoom(req:Request,res:Response,roomInfo:RoomUpdate,roomId:number){
        try {
            //kiêm trả quyền truy cập
            const user_id = await getUserIdlByToken(req.headers.token.toString());
            const currentRoom = await models.room.findFirst({
                where:{
                    id:+roomId,
                    user_id:+user_id.id
                }
            })
            if(currentRoom||req['CurrentUser'].role.toLowerCase()==='admin'){
                //nếu có quyền
                //lấy thông tin cập nhật
                let roomUpdate = {};
                const entries = Object.entries(roomInfo);
                for(let i = 0; i < entries.length; i++){
                    if(entries[i][1]!==null){
                        roomUpdate[`${entries[i][0]}`] = entries[i][1];
                    }
                }
                //cập nhật
                await models.room.update({
                    where:{id:+roomId},
                    data:roomUpdate
                })
                return successCode(res,{roomUpdate},`Đã update Room thành công!`);
            }
            else{
                //nếu không đủ quyền
                return failCode(res,{user_id,roomId},403,'Không đủ quyền thay đổi thông tin này!')
            }
            
        } catch (error) {
            return errorCode(res,`Đã có lỗi! ${error}`);
        }
    }

    async deleteRoom(req:Request,res:Response,roomId:number){
        try {
            //kiêm trả quyền truy cập
            const user_id = await getUserIdlByToken(req.headers.token.toString());
            const currentRoom = await models.room.findFirst({
                where:{
                    id:+roomId,
                    user_id:+user_id.id
                }
            })
            if(currentRoom||req['CurrentUser'].role.toLowerCase()==='admin'){
                await models.room.delete({
                    where:{
                        id:+roomId
                    }
                })
                return successCode(res,{roomId},'Đã xóa room thành công!')
            }
            else{
                //nếu không đủ quyền
                return failCode(res,{user_id,roomId},403,'Không đủ quyền thay đổi thông tin này!')
            }
        } catch (error) {
            return errorCode(res,`Đã có lỗi! ${error}`);
        }
    }
}
