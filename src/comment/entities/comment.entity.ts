import { ApiProperty } from "@nestjs/swagger";

export class Comment{
    @ApiProperty()
    room_id:number
    @ApiProperty()
    user_id:number
    @ApiProperty()
    date:Date
    @ApiProperty()
    content:string
    @ApiProperty()
    rate_comment:number
}