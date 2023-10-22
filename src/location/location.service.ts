import { Injectable } from '@nestjs/common';
import { models } from 'config/config';
import { errorCode, failCode, successCode } from 'config/responese';
import { Response, response } from 'express';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationService {

    async getAllLocation(res:Response){
        try {
            const data = await models.location.findMany();
            return successCode(res,data,'Đã tải thành công danh sách Location!');  
        } catch (error) {
            return errorCode(res,`Đã có lỗi! ${error}`)
        }
    }

    async getLocationByName(res:Response, name:String){
        try {
            const data:Location[] = await models.location.findMany({
                where:{
                    location_name:{
                        contains:name.toLowerCase()
                    }
                }
            })
            return successCode(res,{data},'Lấy danh sách thành công!');
        } catch (error) {
            return errorCode(res,`Đã có lỗi! ${error}`);
        }
    }

    async getLocationByCountry(res:Response, country:string){
        try {
            const countrySearch = await models.country.findMany({
                where:{
                    country_name:{
                        contains:country.toLowerCase()
                    }
                }
            });
            const result = [];
            for(const element of countrySearch){
                const data = await models.location.findMany({
                    where:{
                        country:element.id
                    }
                });
                result.push(data);
            }
            return successCode(res,result,'Lấy danh sách thành công!');
        } catch (error) {
            return errorCode(res,`Đã có lỗi! ${error}`);
        }
    }

    async getLocationByProvince(res:Response,province:string){
        try {
            const provinceSearch = await models.province.findMany({
                where:{
                    province_name:{
                        contains:province.toLowerCase()
                    }
                }
            })
            let result = [];
            for(const province of provinceSearch){
                const data = await models.location.findMany({
                    where:{
                        province:province.id
                    }
                })
                result = [...result,data];
            }
            return successCode(res,result,'Tải danh sách location theo province thành công!');
        } catch (error) {
            return errorCode(res,`Đã có lỗi! ${error}`);
        }
    }
    
    async createLocation(res:Response,locationInfo:Location){
        try {
            const {province,country,image,location_name} = locationInfo;
            const checkProvince = await models.province.findFirst({where:{id:+province}});
            if(checkProvince){
                const checkCountry = await models.country.findFirst({where:{id:+country}});
                if(checkCountry){
                    const checkExist = await models.location.findFirst({where:{
                        province,country,location_name:location_name.toLowerCase()
                    }});
                    if(!checkExist){
                        await models.location.create({
                            data:locationInfo
                        })
                        return successCode(res,{},'Tạo location thành công!');
                    }
                    else{
                        return failCode(res,locationInfo,401,'Đã tồn tại!');
                    }
                }
                else{
                    return failCode(res,{locationInfo},401,'Country không hợp lệ!');
                }
            }
            else{
                return failCode(res,{locationInfo},401,'Province không hợp lệ!');
            }    
        } catch (error) {
            return errorCode(res,`Đã có lỗi! ${error}`)
        }
    }


}
