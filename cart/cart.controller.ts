import { Controller, Post, Get, Body, Delete, Param, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { Request } from 'express';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  addToCart(@Req() req: Request, @Body() item: any) {
    return this.cartService.addToCart(req.session, item);
  }

  @Get()
  getCart(@Req() req: Request) {
    return this.cartService.getCart(req.session);
  }

  @Delete('remove/:id')
  removeFromCart(@Req() req: Request, @Param('id') id: string) {
    const numericId = Number(id);
    if (isNaN(numericId)) {
      throw new Error('Invalid id provided.');
    }
    return this.cartService.removeFromCart(req.session, numericId);
  }
}