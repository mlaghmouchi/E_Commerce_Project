import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
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

  fetchProducts(page: number = 1, limit: number = 8) {
    this.isLoading.set(true);
    this.error.set(null);
    const url = this.apiService.getEndpointUrl(this.endpoint);
    const params = new HttpParams()
      .set('_page', page.toString())
      .set('_per_page', limit.toString());

    return this.http
      .get<PaginatedResponse<Product>>(url, {params,})
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (response) => {
          this.paginatedProducts.set(response.data);
          this.totalPages.set(response.pages);
          this.totalItems.set(response.items);
        },
        error: (error) => {
          this.error.set(error.message);
        },
      });
  }

}
