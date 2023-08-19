import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/model/product.model';
import { Response } from 'src/model/response.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = 'http://172.17.86.148:3000';

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get<Response<Product[]>>(this.url + "/product/list");
  }
}
