import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractService } from '../services/contract.service';
import { UserService } from '../services/user.service';
import { User } from 'src/model/user.model';
import { ethers } from 'ethers';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isDropdownOpen = false;
  
  currentUser: User;
  balance: string;
  
  constructor(private router: Router , private userService: UserService, private contractService: ContractService) {

  }

  async ngOnInit(){  
    this.currentUser = this.userService.getCurrentUser();
    const fds = await this.contractService.getBalance(this.currentUser.WalletAddress);
    this.balance = ethers.utils.formatUnits(fds, 18);
    console.log(this.balance);
  }


  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    this.router.navigate(['']);
  }

  showTransactionHistory() {
    this.router.navigate(['transaction-history']);
  }

  goToHome(role: string | undefined) {
    if (role === 'admin') {
      this.router.navigate(['admin-landing']);  
    } else if (role === 'buyer') {
      this.router.navigate(['buyer-landing']);
    } else if (role === 'seller'){
      this.router.navigate(['seller-landing']);
    } else {
      alert('Some error occurred ! Try after some time');
    }
  }
}
