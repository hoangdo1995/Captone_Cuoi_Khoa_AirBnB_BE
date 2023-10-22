import { ApiProperty } from "@nestjs/swagger";

export class RoomDto{
    @ApiProperty()
	room_name:string;
    @ApiProperty()		
	living_room?:number;
    @ApiProperty()			
	bedroom?:number;	
    @ApiProperty()		
	bed?:number;
    @ApiProperty()
	bathroom?:number;
    @ApiProperty()
	description?:string;
    @ApiProperty()
	cost:number;
    @ApiProperty()
	washing_machine?:boolean;
    @ApiProperty()
	iron?:boolean;
    @ApiProperty()
	televition?:boolean;
    @ApiProperty()
	air_condition?:boolean;
    @ApiProperty()
	wifi?:boolean;
    @ApiProperty()
	parking?:boolean;
    @ApiProperty()
	kitchen?:boolean;
    @ApiProperty()
	image?:string;
    @ApiProperty()
	location_id:number;
}