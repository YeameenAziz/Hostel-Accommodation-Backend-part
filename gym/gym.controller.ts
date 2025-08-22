import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { GymService } from './gym.service';
import { AuthGuard } from '@nestjs/passport';
//@UseGuards(AuthGuard('jwt'))

@Controller('gym')
export class GymController {
  constructor(private readonly gymService: GymService) {}

  // Show All Gyms
  @Get()
  getAllGyms() {
    return this.gymService.getAllGyms();
  }

  // Search a Gym by gym_ID
  @Get('/searchGymMember/:id')
  searchGym(@Param('id') gym_id: string) {
    return this.gymService.getSearchGym(gym_id);
  }

  // Post a New Gym
  @Post('/addNewGymMember')
  addNewGym(@Body() body: any) {
    return this.gymService.addNewGym(body);
  }

  // Update a Gym by gym_ID
  @Put('/updateGymMember/:id')
  updateGym(@Param('id') gym_id: string, @Body() body: any) {
    return this.gymService.updateGym(gym_id, body);
  }

  // Delete a Gym by gym_ID
  @Delete('/deleteGymMember/:id')
  deleteGym(@Param('id') gym_id: string) {
    return this.gymService.deleteGym(gym_id);
  }
}
