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
    @ApiProperty({default:''})
	description?:string;
    @ApiProperty({default:0,required:false})
	cost:number;
    @ApiProperty({default:false,required:false})
	washing_machine?:boolean;
    @ApiProperty({default:false,required:false})
	iron?:boolean;
    @ApiProperty({default:false,required:false})
	televition:boolean;
    @ApiProperty({default:false,required:false})
	air_condition?:boolean;
    @ApiProperty({default:true,required:false})
	wifi?:boolean;
    @ApiProperty({default:true,required:false})
	parking?:boolean;
    @ApiProperty({default:false,required:false})
	kitchen?:boolean;
    @ApiProperty({type:"string",format:'binary'})
	image?:Express.Multer.File;
    @ApiProperty()
	location_id:number;
}