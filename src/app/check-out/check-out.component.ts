import { OrderService } from './../services/order/order.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { ShoppingCart } from './../interfaces/shopping-cart';
import { ShoppingCartService } from './../services/shopping-cart/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  cart: ShoppingCart;
  subscription: Subscription;
  shipping = {};

  constructor(
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService) { }


  async ngOnInit() {
    const cart$ = await this.shoppingCartService.getCart();

    this.subscription = cart$.subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  placeOrder() {
    console.log('-', this.shipping);
    const order = {
      datePlaced: new Date().getTime(),
      shipping: this.shipping || {},
      items: this.cart.items.map(i => {
        return {
          product: {
            title: i.title,
            imageUrl: i.imageUrl,
            price: i.price
          },
          quantity: i.quantity,
          totalPrice: i.totalPrice
        };
      })

    };

    this.orderService.storeOrder(order);

  }

}
