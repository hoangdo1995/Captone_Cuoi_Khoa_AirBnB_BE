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

/**
 * Hàm trả về so
 * @param start1 
 * @param end1 
 * @param start2 
 * @param end2 
 */
const checkDateOverlap=(start1:Date,end1:Date,start2:Date,end2:Date)=>{
    // Nếu start1 hoặc end1 trùng với start2 hoặc end2
    if (
        compareDate(start1, start2) === 0 ||
        compareDate(start1, end2) === 0 ||
        compareDate(end1, start2) === 0 ||
        compareDate(end1, end2) === 0
    ) {
        return true;
    }

    // Nếu start1 sau start2 và end1 trước end2 (khoảng thời gian 1 nằm bên trong khoảng thời gian 2)
    if (compareDate(start1, start2) === 1 && compareDate(end1, end2) === -1) {
        return true;
    }
    // Nếu start2 sau start1 và end2 trước end1 (khoảng thời gian 2 nằm bên trong khoảng thời gian 1)
    if (compareDate(start2, start1) === 1 && compareDate(end2, end1) === -1) {
        return true;
    }
    // Nếu khoảng thời gian 1 chứa toàn bộ khoảng thời gian 2
    if (compareDate(start1, start2) === -1 && compareDate(end1, end2) === 1) {
        return true;
    }
    // Không có sự trùng lắp
    return false;
}

const compareDate = (date1:Date, date2:Date)=>{
    const day1 = date1.getDay();
    const day2 = date2.getDay();
    const month1 = date1.getMonth();
    const month2 = date2.getMonth();
    const year1 = date1.getFullYear();
    const year2 = date2.getFullYear();

    if (year1 < year2) {
        return -1; // date1 nhỏ hơn date2
    } else if (year1 > year2) {
        return 1; // date1 lớn hơn date2
    } else {
        // Cùng năm, tiếp tục so sánh tháng
        if (month1 < month2) {
            return -1; // date1 nhỏ hơn date2
        } else if (month1 > month2) {
            return 1; // date1 lớn hơn date2
        } else {
            // Cùng tháng, tiếp tục so sánh ngày
            if (day1 < day2) {
                return -1; // date1 nhỏ hơn date2
            } else if (day1 > day2) {
                return 1; // date1 lớn hơn date2
            } else {
                return 0; // date1 bằng date2
            }
        }
    }
}



  

export {models,formatFileName,getUserIdlByToken,compareDate, checkDateOverlap};