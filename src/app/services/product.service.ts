import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { finalize, Observable, tap } from 'rxjs';
import { Product } from '../models/product.model';
import { ApiService } from './api.service';


type PaginatedResponse<T> = {
    data: T[];
    pages: number;
    items: number;
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private endpoint = 'products';
  totalPages = signal<number>(0);
  error = signal<string | null>(null);
  isLoading = signal<boolean>(false);
  paginatedProducts = signal<Product[]>([]);
  totalItems = signal<number>(0);

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) { }

  getProductById(id: number): Observable<Product> {
    const url = this.apiService.getEndpointUrl(`${this.endpoint}/${id}`);
    return this.http.get<Product>(url);
  }

  getAllProducts(): Observable<Product[]> {
    const url = this.apiService.getEndpointUrl(this.endpoint);
    return this.http.get<Product[]>(url);
  }

  fetchProducts(page: number = 1, limit: number = 6) {
    this.isLoading.set(true);
    this.error.set(null);
    const url = this.apiService.getEndpointUrl(this.endpoint);
    console.log('Fetching products from:', url);

    return this.http
      .get<Product[]>(url)
      .pipe(
        tap({
          next: (response) => {
            console.log('API Response:', response);
            if (Array.isArray(response)) {
              this.paginatedProducts.set(response);
              this.totalItems.set(response.length);
              this.totalPages.set(Math.ceil(response.length / limit));
            } else {
              console.error('Invalid response format:', response);
              this.error.set('Invalid response format');
            }
          },
          error: (error) => {
            console.error('Error in API call:', error);
            this.error.set(error.message);
          }
        }),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe();
  }

}
