import { ProductService } from './../../services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../interfaces/product';
import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
      .subscribe(
        subscribedProducts => {
          this.products = subscribedProducts;
          this.initializeTable(subscribedProducts);
        });
  }

  private initializeTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);

    this.tableResource.query({offset: 0})
        .then(promisedItems => this.items = promisedItems);
    this.tableResource.count()
        .then(count => this.itemCount = count);
  }

  filter(query: string) {
    let filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;

    this.initializeTable(filteredProducts);
  }

  reloadItems(params) {
    // tslint:disable-next-line:curly
    if (!this.tableResource) return;

    this.tableResource.query(params)
      .then(promisedItems => this.items = promisedItems);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }

}
