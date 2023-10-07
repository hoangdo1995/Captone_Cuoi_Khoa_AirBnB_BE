import { ApiProperty } from "@nestjs/swagger";


export class AuthSignUp{
    @ApiProperty()
    email:string;
    @ApiProperty()
    full_name:string;
    @ApiProperty()
    password:string;
    @ApiProperty()
    birthday?:Date;
    @ApiProperty()
    role?:number;
    @ApiProperty()
    gender:boolean;
}