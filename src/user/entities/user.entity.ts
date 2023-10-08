import { ApiProperty } from "@nestjs/swagger"

export class AvatarUpload {
    @ApiProperty({type:"string",format:'binary'})
    image:Express.Multer.File
}

export class UpdateUser {
    @ApiProperty()
    full_name:string;
    @ApiProperty()
    birthday?:Date;
    @ApiProperty()
    gender:boolean;
    @ApiProperty()
    phone:string
}

export class RoleData{
    @ApiProperty()
    role:Number
}

export class UserId{
    @ApiProperty()
    id:Number
}