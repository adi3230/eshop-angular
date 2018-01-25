import { ShoppingCartService } from './../services/shopping-cart/shopping-cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../interfaces/product';

@Component({
  selector: 'product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {
  @Input('product') product: Product;
  // tslint:disable-next-line:no-input-rename
  @Input('show-actions') showActions = true;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(product: Product) {
    let cartId = localStorage.getItem('cartId');

    if (!cartId) {
      this.cartService.create().then(result => {
        localStorage.setItem('cartId', result.key);
      });
    } else {

    }
  }

  ngOnInit() {
  }

}
