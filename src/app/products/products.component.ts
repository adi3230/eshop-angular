import { Product } from './../interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category/category.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories$;
  category: string;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private categoryService: CategoryService) {
    productService.getAll()
          .switchMap(subscribedProducts => {
            this.products = subscribedProducts;
            return route.queryParamMap;
          })
          .subscribe(params => {
              this.category = params.get('category');

              this.filteredProducts = (this.category) ?
                this.products.filter(p => p.category === this.category) :
                  this.products;
          });

    this.categories$ = categoryService.getCategories();
  }
}
