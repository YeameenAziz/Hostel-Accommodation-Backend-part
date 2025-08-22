import { Injectable } from '@nestjs/common';

@Injectable()
export class CartService {
  addToCart(session: any, item: any) {
    if (!session.cart) {
      session.cart = [];
    }
    if (!item.id) {
      throw new Error('Item must have an id.');
    }
    session.cart.push(item);
    return session.cart;
  }

  getCart(session: any) {
    return session.cart || [];
  }

  removeFromCart(session: any, itemId: number) {
    if (session.cart) {
      session.cart = session.cart.filter((item) => String(item.id) !== String(itemId));
    }

    session.save((err: any) => {
      if (err) {
        console.error('Error saving session:', err);
      }
    });

    return {
      message: 'Item removed successfully',
      New_Update: session.cart,
    };
  }
}