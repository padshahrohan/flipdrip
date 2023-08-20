import { Component, OnInit } from '@angular/core';
import { ContractService } from '../services/contract.service';
import { environment } from 'src/environments/environment';
import flipdripContractAbi from 'src/assets/Flipdrip.json';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { User } from 'src/model/user.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin-landing',
  templateUrl: './admin-landing.component.html',
  styleUrls: ['./admin-landing.component.css']
})
export class AdminLandingComponent implements OnInit {
  records: User[] = [];
  balance: string;

  constructor(private contractService: ContractService, private http: HttpClient, private userService: UserService) {
    
  }

  async ngOnInit() {
    await this.contractService.connectWallet();
    this.fetchBalance();
    this.userService.getApprovalListOfSellers().subscribe((resp) => {
      this.records = resp.result ? resp.result : [];
    });
  }

  async fetchBalance() {
    this.balance = await this.contractService.getBalance(this.userService.getCurrentUser().WalletAddress); 
  }

  async doTransaction(record: User) {
    console.log(record);
    
    const result = await this.contractService.transfer(record.WalletAddress, '5000');
    let body = {
      FromWalletAddress: this.userService.getCurrentUser().WalletAddress,
      ToWalletAddress: record.WalletAddress,
      Coins: 5000
    }

    if (result) {
      const approveSellerTokens$ = this.userService.approveSellerTokens(record.ID);
      const addTransaction$ = this.userService.addTransaction(body);
      forkJoin([approveSellerTokens$, addTransaction$])
      .subscribe((res) => {
        this.fetchBalance();
        this.userService.getApprovalListOfSellers().subscribe((resp) => {
          this.records = resp.result ? resp.result : [];
        })
      })
    } else {
      alert(' Transaction Unsuccessful !!');
    }
  }
}
