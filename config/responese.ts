import { Response } from "express"

//success =>? 200
const successCode =(res:Response, content:any, message:string)=>{
    res.status(200).json({
        message,
        statusCode:200,
        content,
        data: new Date()
    })
}

//fail => 400, 401, 404
const failCode = (res:Response,content:any, statusCode:number, message:string)=>{
    res.status(statusCode).json({
        message,
        statusCode,
        content,
        data: new Date()
    })
}

// error => 500

const errorCode = (res:Response,message:string)=>{
    res.status(500).json({
        message,
        statusCode:500,
        date: new Date()
    })
}

export {successCode,errorCode,failCode}