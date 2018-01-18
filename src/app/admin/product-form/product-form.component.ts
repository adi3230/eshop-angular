import { ProductService } from './../../services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = categoryService.getCategories();

    // tslint:disable-next-line:no-trailing-whitespace
    let id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.productService.getProduct(id).take(1).subscribe(p => this.product = p);
    }
  }

  save(product) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }

}
