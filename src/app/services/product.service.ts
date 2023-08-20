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

  getAllProductsForSeller(sellerId: any) {
    return this.http.get<Response<Product[]>>(this.url + `/product/list?SellerId=${sellerId}`);
  }

  addProduct(product: any) {
    return this.http.post(this.url + '/product/add', product);
  }

  getLoyalty(buyerId: any, sellerId: any) {
    return this.http.get<Response<number>>(this.url + '/product/getLoyalty?BuyerId='+ buyerId + '&SellerId=' + sellerId);
  }

  buyProduct(buyerId: any, sellerId: any, productId: any) {
    let body = {
      BuyerId: buyerId,
      SellerId: sellerId,
      ProductId: productId
    }
    return this.http.post(this.url + '/product/buy', body);
  }
}
