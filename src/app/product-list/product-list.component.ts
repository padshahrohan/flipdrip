import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from 'src/model/product.model';
import { ContractService } from '../services/contract.service';
import { UserService } from '../services/user.service';
import { User } from 'src/model/user.model';
import { ethers } from 'ethers';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productToBuy = false;
  alertMessage: string;
  product: Product | null;
  products: Product[] = [];
  currentUser: User;
  isVisible = false;

  constructor(private productService: ProductService, private contractService: ContractService,
    private userService: UserService) {

  }

  ngOnInit(): void {
    this.contractService.connectWallet().then((res) => {
      this.currentUser = this.userService.getCurrentUser();
      this.productService.getAllProducts().subscribe((resp) => {
        this.products = resp.result ? resp.result : [];
      })
    })
    
    
  }

  showAlert() : void {
    if (this.isVisible) { // if the alert is visible return
      return;
    } 
    this.isVisible = true;
    setTimeout(()=> this.isVisible = false,2500); // hide the alert after 2.5s
  }

  async redeem(product: Product) {
    const fds = await this.contractService.getBalance(this.currentUser.WalletAddress);
    const balance = ethers.utils.formatUnits(fds, 18);

    if (parseInt(balance) < product.Tokens) {
      this.alertMessage = 'Insufficient loyalty coins';
      this.showAlert();
      
    }

    this.userService.getWalletAddress(product.SellerId).subscribe((res) => {
      this.contractService.transfer(res.result, product.Tokens+"").then(() => {
        this.alertMessage = 'Product redeemed successfully';
        this.showAlert();
      })
    });
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
