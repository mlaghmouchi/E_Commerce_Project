import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private endpoint = 'products';

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
}
