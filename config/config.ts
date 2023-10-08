import { PrismaClient } from "@prisma/client";
import { JwtService } from '@nestjs/jwt';

const models = new PrismaClient();

const formatFileName = (originalFileName) => {
    // Loại bỏ các ký tự không hợp lệ hoặc thay thế chúng bằng gạch dưới '_'
    const validChars = originalFileName.replace(/[^a-zA-Z0-9_.-]/g, '_');
  
    // Giới hạn độ dài của tên tệp tin (nếu cần)
    const maxLength = 255; // Độ dài tối đa cho tên tệp tin
    const truncatedFileName = validChars.substring(0, maxLength);
  
    return truncatedFileName;
}

const getUserIdlByToken = async(token:string)=>{
    const jwtService = new JwtService();
    const email = jwtService.decode(token)['email'];
    const id = await models.user.findFirst({
        where:{email},
        select:{
            id:true
        }
    });
    return id;
}
export {getUserIdlByToken}



  

export {models,formatFileName};