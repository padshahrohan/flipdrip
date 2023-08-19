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
  records: any;
  currentUser: User;
  constructor(private contractService: ContractService, private userService: UserService) {

  }

  async ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    const records = await this.contractService.getTransactionHistory(this.currentUser.WalletAddress);
    console.log(records);
    this.records = records;
  }

  formatEther(wei: string): string {
    return ethers.utils.formatEther(wei);
  }
}
