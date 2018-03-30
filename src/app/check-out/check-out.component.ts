import { Observable } from 'rxjs/Observable';
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
export class CheckOutComponent implements OnInit {
  cart$: Observable<ShoppingCart>;

  constructor(private shoppingCartService: ShoppingCartService) { }


  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }

}
