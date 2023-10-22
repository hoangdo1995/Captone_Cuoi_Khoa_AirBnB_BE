import { ApiProperty } from "@nestjs/swagger";

export class BookType{
    @ApiProperty()
    room_id:number;
    @ApiProperty()
    start_day:Date;
    @ApiProperty()
    end_day:Date;
    @ApiProperty()
    guest_count:number;
}