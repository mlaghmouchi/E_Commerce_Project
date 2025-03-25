import { Component, computed, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  productService = inject(ProductService);
  totalPages = this.productService.totalPages.asReadonly();
  totalItems = this.productService.totalItems.asReadonly();

  currentPage = 1;
  pages = computed(() => {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  });

  onPageChange(page: number) {
    this.currentPage = page;
    this.productService.fetchProducts(page);
  }
}