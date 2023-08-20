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
  walletAddresses = new Set();
  addressToName: any;
  constructor(private contractService: ContractService, private userService: UserService) {

  }

  async ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    this.contractService.getTransactionHistory(this.currentUser.WalletAddress).then((records) => {
      
      records.forEach((tx) => {
        if (tx.to) {
          tx.to = tx.to.toLowerCase();
          this.walletAddresses.add(tx.to);
        }
          
        if (tx.from) {
          tx.from = tx.from.toLowerCase();
          this.walletAddresses.add(tx.from);
        }
          
      })

      
      this.userService.getUserNameForWalletAddresses(Array.from(this.walletAddresses)).subscribe((res) => {
        console.log(res);
        this.addressToName = res.result;
        this.records = records;  
      })
    })
    
  }

  formatEther(wei: string): string {
    return ethers.utils.formatEther(wei);
  }
}
