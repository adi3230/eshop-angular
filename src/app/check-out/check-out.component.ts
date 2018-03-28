import { AuthService } from './../services/auth/auth.service';
import { OrderService } from './../services/order/order.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { ShoppingCart } from './../interfaces/shopping-cart';
import { ShoppingCartService } from './../services/shopping-cart/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Order } from '../interfaces/order';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  cart: ShoppingCart;
  cartSubscription: Subscription;
  userSubscription: Subscription;
  userId: string;
  shipping = {};

  constructor(
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService) { }


  async ngOnInit() {
    const cart$ = await this.shoppingCartService.getCart();

    this.cartSubscription = cart$.subscribe(cart => this.cart = cart);
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);

    this.orderService.storeOrder(order);

  }

}
