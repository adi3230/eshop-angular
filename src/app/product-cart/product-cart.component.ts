import { ShoppingCartService } from './../services/shopping-cart/shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../interfaces/product';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {
  @Input('product') product: Product;
  // tslint:disable-next-line:no-input-rename
  @Input('show-actions') showActions = true;
  // tslint:disable-next-line:no-input-rename
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(product: Product) {
    return this.cartService.addToCart(product);
  }

  getQuantity() {
    // tslint:disable-next-line:curly
    // tslint:disable-next-line:semicolon
    if (!this.shoppingCart) {
      return 0;
    }

    const item = this.shoppingCart.items[this.product.$key];
    return item ? item.quantity : 0;
  }

  ngOnInit() {
  }

}
