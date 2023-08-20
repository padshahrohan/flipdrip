import { Component, OnInit } from '@angular/core';
import { ContractService } from '../services/contract.service';
import { ethers } from 'ethers';
import { User } from 'src/model/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {
  transactions: any;
  currentUser: User;
  walletAddresses = new Set();
  addressToName: any;
  balance:string;
  constructor(private contractService: ContractService, private userService: UserService) {

  }

  async ngOnInit() {
    await this.contractService.connectWallet();
    this.currentUser = this.userService.getCurrentUser();
    this.balance = await this.contractService.getBalance(this.currentUser.WalletAddress);
    this.userService.getTransactionsFor(this.currentUser.ID).subscribe((res) => {
      console.log(res);
      
      this.transactions = res.result ? res.result : [];
    })
    
  }

  formatEther(wei: string): string {
    return ethers.utils.formatEther(wei);
  }
}
