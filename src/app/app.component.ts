import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    HomeComponent,
    ProductListComponent,
    FooterComponent
  ],
  template: `
    <app-navbar></app-navbar>
    <app-home></app-home>
    <app-product-list></app-product-list>
    <app-footer></app-footer>
  `
})
export class AppComponent {
  title = 'E-Commerce Project';
}
