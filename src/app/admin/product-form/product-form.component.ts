import { ProductService } from './../../services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: Product;
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = categoryService.getCategories();

    // tslint:disable-next-line:no-trailing-whitespace
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.productService.getProduct(this.id).take(1).subscribe(p => this.product = p);
    }
  }

  save(product: object) {
    if (this.id) {
      this.productService.updateProduct(this.id, product);
    } else {
      this.productService.create(product);
    }

    this.router.navigate(['/admin/products']);
  }

  delete() {
    // tslint:disable-next-line:curly
    if (!confirm('Are you sure you want to delete the product')) return;

    this.productService.deleteProduct(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }

}
