import { async } from '@angular/core/testing';
import { ShoppingCartService } from './../services/shopping-cart/shopping-cart.service';
import { AppUser } from './../interfaces/app-user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  shoppingCartItemCount: number;

  constructor(private authService: AuthService,
  private shoppingCartService: ShoppingCartService) {

  }

  async ngOnInit() {
    this.authService.appUser$.subscribe(appUser => this.appUser = appUser);
    let cart$ = await this.shoppingCartService.getCart();

    cart$.subscribe(cart => {
      this.shoppingCartItemCount = 0;
      // tslint:disable-next-line:prefer-const
      // tslint:disable-next-line:forin
      // tslint:disable-next-line:curly
      for (let productId in cart.items)
        this.shoppingCartItemCount += cart.items[productId].quantity;
    });
  }

  logout() {
    this.authService.logout();
  }



}
