import { Body, Controller, Get, Header, Param, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { LocationService } from './location.service';
import { ApiBody, ApiHeader, ApiHeaders, ApiTags } from '@nestjs/swagger';
import { Location } from './entities/location.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/role.guard';

@ApiTags('location')
@Controller('location')
export class LocationController {
    constructor(private locationService:LocationService){}

    @Get('')
    @Header('Cache-Control', 'none')
    @Header('Access-Control-Allow-Origin', 'http://localhost:3000')
    async getAllLocation(@Res() res:Response){
        return this.locationService.getAllLocation(res);
    }

    @Get('by-name/:name')
    async getLocationByName(@Res() res:Response,@Param('name') name:String){
        return this.locationService.getLocationByName(res,name);
    }

    @Get('by-country/:country')
    async getLocationByCountry(@Res() res:Response,@Param('country') country:string){
        return this.locationService.getLocationByCountry(res,country);
    }

    @Get('by-province/:province')
    async getLocationByProvince(@Res() res:Response,@Param('province') province:string){
        return this.locationService.getLocationByProvince(res,province);
    }
    
    @Post('')
    @UseGuards(new RolesGuard(['admin','leaser']))
    @UseGuards(AuthGuard)
    @ApiHeader({name:'token',description:'Login token'})
    @ApiBody({type:Location})
    async createLocation(@Res() res:Response,@Body() locationInfo){
        return this.locationService.createLocation(res,locationInfo);
    }
}
