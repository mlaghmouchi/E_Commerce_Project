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
    effect(() => {
      const currentProducts = this.products();
      console.log('Current products:', currentProducts); // Log products
      this.filteredProducts.set(currentProducts);
    });
  }

  ngOnInit() {
    console.log('Initializing ProductListComponent');
    this.productService.fetchProducts();
  }

  filterByCategory(category: string): void {
    console.log('Filtering by category:', category); // Log category filter
    this.selectedCategory.set(category);
    const currentProducts = this.products();
    console.log('Current products before filter:', currentProducts); // Log products before filter
    
    if (category === 'all') {
      this.filteredProducts.set(currentProducts);
    } else {
      const filtered = currentProducts.filter(product => product.category === category);
      console.log('Filtered products:', filtered); // Log filtered products
      this.filteredProducts.set(filtered);
    }
  }
}
