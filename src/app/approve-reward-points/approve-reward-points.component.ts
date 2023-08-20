import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';
import { environment } from 'src/environments/environment';
import FlipKart from 'src/assets/Flipdrip.json';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { User } from 'src/model/user.model';
import { ProductService } from '../services/product.service';
import { ContractService } from '../services/contract.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-approve-reward-points',
  templateUrl: './approve-reward-points.component.html',
  styleUrls: ['./approve-reward-points.component.css']
})
export class ApproveRewardPointsComponent implements OnInit{
  users: any[] = [];
  currentUser: User;

  async ngOnInit() {
    await this.contractService.connectWallet();
    this.currentUser = this.userService.getCurrentUser();
    this.fetchUserDetails();
  }

  constructor(private http: HttpClient, private userService: UserService, 
    private contractService: ContractService ) {}

  fetchUserDetails() {
    const sellerId = this.currentUser.ID; // Replace with the actual seller ID

    // Make an HTTP GET request to fetch products by seller ID
    this.userService.getApprovalListOfBuyers(sellerId).subscribe(
      (response) => {
        this.users = response.result ? response.result : []; // Assign fetched products to the array
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  async approveRewardPoints(user: any) {
    await this.contractService.transfer(user.WalletAddress, user.Coins+'');
    let body = {
      FromWalletAddress: this.currentUser.WalletAddress,
      ToWalletAddress: user.WalletAddress,
      Coins: user.Coins
    }
    const approveBuyerTokens$ = this.userService.approveBuyerTokens(this.currentUser.ID, user.ID);
    const addTransaction$ = this.userService.addTransaction(body);
      
    forkJoin([approveBuyerTokens$, addTransaction$]).subscribe((res) => {
      this.fetchUserDetails();
    }); 
    

    console.log(`Reward points approved for wallet address ${user.WalletAddress}`);
  }
}