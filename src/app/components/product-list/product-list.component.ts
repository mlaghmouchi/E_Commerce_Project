import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products = signal<Product[]>([]);
  filteredProducts = signal<Product[]>([]);
  selectedCategory = signal<string>('all');

  categories = [
    { id: 'all', name: 'All Products' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'home', name: 'Home & Living' },
    { id: 'books', name: 'Books' }
  ];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products.set(products);
        this.filteredProducts.set(products);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
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
