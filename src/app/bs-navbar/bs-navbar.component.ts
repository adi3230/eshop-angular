import { Observable } from 'rxjs/Observable';
import { async } from '@angular/core/testing';
import { ShoppingCartService } from './../services/shopping-cart/shopping-cart.service';
import { AppUser } from './../interfaces/app-user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { ShoppingCart } from '../interfaces/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(private authService: AuthService,
  private shoppingCartService: ShoppingCartService) {

  }

  async ngOnInit() {
    this.authService.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.shoppingCartService.getCart();
  }

  logout() {
    this.authService.logout();
  }



}
