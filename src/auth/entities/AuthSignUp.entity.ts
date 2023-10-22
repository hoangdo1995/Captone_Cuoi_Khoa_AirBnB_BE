import { ApiProperty } from "@nestjs/swagger";


export class AuthSignUp{
    @ApiProperty()
    email:string;
    @ApiProperty()
    full_name:string;
    @ApiProperty()
    password:string;
    @ApiProperty()
    phone:string;
    @ApiProperty()
    birthday?:Date;
    @ApiProperty()
    gender:boolean;
    @ApiProperty()
    role:number

}