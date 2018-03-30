import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { OrderService } from './../services/order/order.service';
import { AuthService } from './../services/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../interfaces/order';
import { ShoppingCart } from '../interfaces/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;

  userSubscription: Subscription;
  userId: string;
  shipping = {
    name: "",
    addressLine1: "",
    addressLine2: "",
    city: ""
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);

    let result = await this.orderService.placeOrder(order);

    this.router.navigate(['/order-success', result.key]);

  }

}
