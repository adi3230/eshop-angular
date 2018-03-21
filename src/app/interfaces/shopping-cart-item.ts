import { Product } from "./product";

export class ShoppingCartItem {
  constructor(public product, public quantity: number) {

  }

  get totalPrice() {
    return this.quantity * this.product.price;
  }
}
