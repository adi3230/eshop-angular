import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {
  items: ShoppingCartItem[] = [];
  constructor(public itemsMap: { [productId: string]: ShoppingCartItem}) {
    // tslint:disable-next-line:forin
    for (const productId in itemsMap) {
      this.items.push(itemsMap[productId]);
    }
  }

  get totalItemsCount() {
    let count = 0;
    // tslint:disable-next-line:curly
    for (const productId in this.itemsMap)
      count += this.itemsMap[productId].quantity;
    return count;
  }
}
