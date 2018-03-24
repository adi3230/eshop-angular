import { ShoppingCartService } from './../services/shopping-cart/shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../interfaces/product';
import { ShoppingCart } from '../interfaces/shopping-cart';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent {
  @Input('product') product: Product;
  // tslint:disable-next-line:no-input-rename
  @Input('show-actions') showActions = true;
  // tslint:disable-next-line:no-input-rename
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    return this.cartService.addToCart(this.product);
  }

}
