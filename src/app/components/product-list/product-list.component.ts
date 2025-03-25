import { Component, inject, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../product-card/product-card.component';
import { PaginationComponent } from "../pagination/pagination.component";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, PaginationComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  filteredProducts = signal<Product[]>([]);
  selectedCategory = signal<string>('all');

  categories = [
    { id: 'all', name: 'All Products' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'home', name: 'Home & Living' },
    { id: 'books', name: 'Books' }
  ];

  productService = inject(ProductService);
  products = this.productService.paginatedProducts.asReadonly();
  isLoading = this.productService.isLoading.asReadonly();
  error = this.productService.error.asReadonly();

  constructor() {
    // Create an effect to update filteredProducts whenever products change
    effect(() => {
      this.filteredProducts.set(this.products());
    });
  }

  ngOnInit() {
    this.productService.fetchProducts();
  }

  filterByCategory(category: string): void {
    this.selectedCategory.set(category);
    if (category === 'all') {
      this.filteredProducts.set(this.products());
    } else {
      const filtered = this.products().filter(product => product.category === category);
      this.filteredProducts.set(filtered);
    }
  }
}
