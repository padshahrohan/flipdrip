import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from 'src/model/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productToBuy = false;
  product: Product | null;
  products: Product[] = [];

  constructor(private productService: ProductService) {

  }

  ngOnInit(): void {

    this.productService.getAllProducts().subscribe((resp) => {
      this.products = resp.result ? resp.result : [];
    })
    
  }

  closeModal() {
    this.product = null;
    this.productToBuy = false;
  }

  openBuyProductModal(product: Product) {
    this.product = product;
    this.productToBuy = true;
  }
  
}
