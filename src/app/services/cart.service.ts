import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class YourService {
  constructor(private apiService: ApiService) {}

  // Example method using the API URL
  getData() {
    const url = this.apiService.getEndpointUrl('your-endpoint');
  }
}