import { ShoppingCartService } from './../shopping-cart/shopping-cart.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {

  constructor(private shoppingCartService: ShoppingCartService, private db: AngularFireDatabase) { }

  async placeOrder(order) {
    let orderPlaced = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return orderPlaced;
  }

}
