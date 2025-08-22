import { Controller, Post, Get, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { MealService } from './meal.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('/meals')
//@UseGuards(AuthGuard('jwt')) // Apply JWT authentication to all routes
export class MealController {
  constructor(private readonly mealService: MealService) {}

  // Get all meals
  @Get()
  getMealDetails() {
    return this.mealService.getAllMeals();
  }

  // Add a new meal
  @Post('/addNewMeal')
  async addMeal(@Body() mealData: { mealPackageName: string; mealPrice: number; mealDetails?: string }) {
    if (!mealData.mealPackageName || typeof mealData.mealPackageName !== 'string') {
      return { message: "Invalid meal package name." };
    }
    if (!mealData.mealPrice || typeof mealData.mealPrice !== 'number') {
      return { message: "Invalid meal price." };
    }
    return this.mealService.addNewMeal(mealData);
  }

  // Get a meal by ID
  @Get('/searchMeal/:mealId')
  async getMealById(@Param('mealId') mealId: string) {
    if (!mealId || isNaN(Number(mealId))) {
      return { message: "Invalid meal ID." };
    }
    return this.mealService.getSearchMeal(mealId);
  }

  // Update a meal
  @Put('/updateMeal/:mealId')
  async updateMeal(
    @Param('mealId') mealId: string,
    @Body() updatedMeal: { mealPackageName?: string; mealPrice?: number; mealDetails?: string },
  ) {
    if (updatedMeal.mealPackageName && typeof updatedMeal.mealPackageName !== 'string') {
      return { message: "Invalid meal package name." };
    }
    if (updatedMeal.mealPrice && typeof updatedMeal.mealPrice !== 'number') {
      return { message: "Invalid meal price." };
    }
    return this.mealService.updateMeal(mealId, updatedMeal);
  }

  // Delete a meal
  @Delete(':mealId')
  async deleteMeal(@Param('mealId') mealId: string) {
    if (!mealId || isNaN(Number(mealId))) {
      return { message: "Invalid meal ID." };
    }
    return this.mealService.deleteMeal(mealId);
  }
}
