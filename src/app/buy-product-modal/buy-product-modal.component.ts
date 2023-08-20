import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/model/product.model';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { User } from 'src/model/user.model';

@Component({
  selector: 'app-buy-product-modal',
  templateUrl: './buy-product-modal.component.html',
  styleUrls: ['./buy-product-modal.component.css']
})
export class BuyProductModalComponent implements OnInit {

  @Input() product: Product | null;
  @Output() closeModalEvent = new EventEmitter<string>();

  fetchingLoyalty = false;
  productBought = false;
  loyalty: number;
  currentUser: User;

  constructor(private productService: ProductService, private userService: UserService) {

  }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
    console.log(this.product);
    this.fetchingLoyalty = true;
    this.productService.getLoyalty(this.currentUser.ID, this.product?.SellerId).subscribe((resp) => {
      this.fetchingLoyalty = false;
      this.loyalty = resp.result;
    });

  }
  
  closeModal(): void {
    this.closeModalEvent.emit();
  }

  buyProduct() {
    this.productService.buyProduct(this.currentUser.ID, this.product?.SellerId, this.product?.ID).subscribe((res) => {
      this.productBought = true;
    });
  }
}
