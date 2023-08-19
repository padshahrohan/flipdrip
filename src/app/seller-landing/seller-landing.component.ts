import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ethers } from 'ethers';
import { environment } from 'src/environments/environment';
import flipkartAbi from 'src/assets/Flipdrip.json'
import { UserService } from '../services/user.service';
import { User } from 'src/model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-landing',
  templateUrl: './seller-landing.component.html',
  styleUrls: ['./seller-landing.component.css']
})
export class SellerLandingComponent {
  products: any[] = []; // Array to store fetched products
  showAddProductForm: boolean = false;
  currentUser: User;

  constructor(private http: HttpClient , private router: Router) {}

  ngOnInit() {
    
  }

  fetchProducts() {
    const sellerId = 1; // Replace with the actual seller ID

    // Make an HTTP GET request to fetch products by seller ID
    this.http.get<any>(`http://172.17.87.26:3000/product/list?SellerId=${sellerId}`).subscribe(
      (response) => {
        this.products = response.result; // Assign fetched products to the array
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  onApproveRewardPointsClick() {
    // Make your API call here to fetch user details
    // Once the data is fetched, navigate to the approve-reward-points route
    this.router.navigate(['/approve-reward-points']);
  }
}
