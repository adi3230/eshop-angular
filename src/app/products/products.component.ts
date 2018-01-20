import { ProductService } from './../services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category/category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products$;
  categories$;

  constructor(private productService: ProductService,
              private categoryService: CategoryService) {
    this.products$ = productService.getAll();
    this.categories$ = categoryService.getCategories();
  }

}
