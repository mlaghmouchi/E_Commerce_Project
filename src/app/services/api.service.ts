import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor() { }

  getApiUrl(): string {
    return this.apiUrl;
  }

  getEndpointUrl(endpoint: string): string {
    return `${this.apiUrl}/${endpoint}`;
  }
} 