import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meal } from './meal.entity';

@Injectable()
export class MealService {
  constructor(
    @InjectRepository(Meal)
    private readonly mealRepository: Repository<Meal>,
  ) {}

  setMeal_HomePage(): string {
    return "This is the Meal Page!";
  }

  async getAllMeals() {
    return await this.mealRepository.find();
  }

  async getSearchMeal(id: string) {
    const meal = await this.mealRepository.findOne({ where: { mealId: Number(id) } }); // Convert id to number
    return meal || { message: "Meal not found!" };
  }

  async addNewMeal(data: any) {
    const newMeal = this.mealRepository.create(data);
    await this.mealRepository.save(newMeal);
    return {
      message: "New meal added successfully!",
      data: newMeal,
    };
  }

  async updateMeal(updateId: string, updatedData: any) {
    const meal = await this.mealRepository.findOne({ where: { mealId: Number(updateId) } }); // Convert updateId to number

    if (!meal) {
      return { message: "Meal not found!" };
    }

    await this.mealRepository.update(meal.mealId, updatedData); // Use meal.mealId
    return {
      message: "Meal updated successfully!",
      updatedMeal: { ...meal, ...updatedData },
    };
  }

  async deleteMeal(id: string) {
    const meal = await this.mealRepository.findOne({ where: { mealId: Number(id) } }); // Convert id to number

    if (!meal) {
      return { message: "Meal not found!" };
    }

    await this.mealRepository.delete(meal.mealId); // Use meal.mealId
    return {
      message: `Meal with ID ${id} deleted successfully.`,
      deletedMeal: meal,
    };
  }
}