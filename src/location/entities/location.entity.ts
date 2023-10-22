import { ApiProperty } from "@nestjs/swagger";

export class Location{
    @ApiProperty()
    location_name:string;
    @ApiProperty()
    province:number;
    @ApiProperty()
    country:number;
    @ApiProperty()
    image:string;
}