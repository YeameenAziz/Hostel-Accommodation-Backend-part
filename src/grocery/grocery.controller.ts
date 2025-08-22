import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { GroceryService } from './grocery.service';
import { CreateGroceryDto } from './grocery.dto';
import { Grocery } from './grocery.entity';

@Controller('grocery')
export class GroceryController {
  constructor(private readonly groceryService: GroceryService) {}

  // Get all groceries
  @Get()
  getAllGroceries(){
    return this.groceryService.getAllGroceries();
  }

  // Create a new grocery item
  @Post('/createGroceryItem')
  createGrocery(@Body() createGroceryDto: CreateGroceryDto) {
    return this.groceryService.createGrocery(createGroceryDto);
  }

  


  // Update an existing grocery item
  @Put(':id')
  updateGrocery(
    @Param('id') id: number,
    @Body() updateData: Partial<Grocery>,
  ): Promise<Grocery> {
    return this.groceryService.updateGrocery(id, updateData);
  }

  // Delete a grocery item
  @Delete(':id')
  deleteGrocery(@Param('id') id: number) {
    return this.groceryService.deleteGrocery(id);
  }
}