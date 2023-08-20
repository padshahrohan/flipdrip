import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ethers } from 'ethers';
import { environment } from 'src/environments/environment';
import flipkartAbi from 'src/assets/Flipdrip.json'
import { UserService } from '../services/user.service';
import { User } from 'src/model/user.model';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ContractService } from '../services/contract.service';

@Component({
  selector: 'app-seller-landing',
  templateUrl: './seller-landing.component.html',
  styleUrls: ['./seller-landing.component.css']
})
export class SellerLandingComponent {
  products: any[] = []; // Array to store fetched products
  showAddProductForm: boolean = false;
  currentUser: User;
  balance: string;

  constructor(private router: Router, private userService: UserService,
    private productService: ProductService, private contractService: ContractService) {}

  async ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    await this.contractService.connectWallet();
    this.balance = await this.contractService.getBalance(this.userService.getCurrentUser().WalletAddress);  
    this.fetchProducts();
    
  }

  fetchProducts() {
    const sellerId = this.currentUser.ID; // Replace with the actual seller ID

    // Make an HTTP GET request to fetch products by seller ID
    this.productService.getAllProductsForSeller(sellerId).subscribe(
      (response) => {
        this.products = response.result; // Assign fetched products to the array
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  hideAddProductForm() {
    this.showAddProductForm = false;
    this.fetchProducts();
  }

  onApproveRewardPointsClick() {
    this.router.navigate(['approve-reward-points']);
  }
}
