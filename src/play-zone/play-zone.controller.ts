import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PlayZoneService } from './play-zone.service';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))


@Controller('play-zone')
export class PlayZoneController {
  constructor(private readonly playZoneService: PlayZoneService) {}

  // Basic Play Zone Home Page
  @Get()
  async getPlayZone_HomePage(): Promise<any> {
    const homePageMessage = this.playZoneService.setPlayZone_HomePage();
    const allPlayZones = await this.playZoneService.getAllPlayZones();
    
    return {
      message: homePageMessage,  // Home page message
      playZones: allPlayZones,   // All fetched play zones
    };
  }

  // Search for a specific Play Zone by ID
  @Get('/searchPlayZone/:id')
  getSearchPlayZone(@Param('id') id: string) {
    return this.playZoneService.getSearchPlayZone(id);
  }

  // Add a new Play Zone reservation
  @Post('/addNewPlayZone')
  addNewPlayZone(@Body() data: any) {
    return this.playZoneService.addNewPlayZone(data);
  }

  // Update Play Zone reservation details
  @Put('/updatePlayZone/:id')
  updatePlayZone(@Param('id') updateId: string, @Body() updatedData: any) {
    return this.playZoneService.updatePlayZone(updateId, updatedData);
  }

  // Delete a Play Zone reservation
  @Delete('/deletePlayZone/:id')
  deletePlayZone(@Param('id') id: string) {
    return this.playZoneService.deletePlayZone(id);
  }
}
