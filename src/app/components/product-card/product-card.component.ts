import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { LucideAngularModule, ShoppingCart, Star } from 'lucide-angular';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  readonly ShoppingCartIcon = ShoppingCart;
  readonly StarIcon = Star;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    // Remove the fetch since we're using @Input
  }

  addToCart(product: Product): void {
    // TODO: Implement cart functionality
    console.log('Adding to cart:', product);
  }

  getStars(): number[] {
    return Array(5).fill(0).map((_, index) => index + 1);
  }
}
