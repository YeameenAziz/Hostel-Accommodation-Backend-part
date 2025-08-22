import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { LaundryService } from './laundry.service';
import { AuthGuard } from '@nestjs/passport';
//@UseGuards(AuthGuard('jwt'))

@Controller('laundry')
export class LaundryController {
  constructor(private readonly laundryService: LaundryService) {}

  // Home page route for laundry service and show all laundry reservations
@Get()
async getLaundryHomePage(): Promise<any> {
  const homePageMessage = this.laundryService.setLaundry_HomePage();  // Home page message
  const allLaundryReservations = await this.laundryService.getAllLaundry();  // All fetched laundry reservations
  
  return {
    message: homePageMessage,  // Home page message
    laundryReservations: allLaundryReservations,  // All fetched laundry reservations
  };
}


  // Search a Laundry Reservation by user_id
  @Get('/searchLaundry/:id')
  getSearchLaundry(@Param('id') user_id: string) {
    return this.laundryService.getSearchLaundry(user_id);
  }

  // Add New Laundry Reservation
  @Post('/addNewLaundry')
  addNewLaundry(@Body() data: any) {
    return this.laundryService.addNewLaundry(data);
  }

  // Update Laundry Reservation Information
  @Put('/updateLaundry/:id')
  updateLaundry(@Param('id') user_id: string, @Body() updatedData: any) {
    return this.laundryService.updateLaundry(user_id, updatedData);
  }

  // Delete a Laundry Reservation
  @Delete('/deleteLaundry/:id')
  deleteLaundry(@Param('id') user_id: string) {
    return this.laundryService.deleteLaundry(user_id);
  }
}
