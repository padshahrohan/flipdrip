import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractService } from '../services/contract.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isDropdownOpen = false;

  walletAddrress: string = "";
  
  constructor(private router: Router, private contractService: ContractService) {

  }

  ngOnInit(): void {  
    
    this.contractService.walletAddress$.subscribe((walletAddress) => {
      this.walletAddrress = walletAddress;
      
      if (this.walletAddrress === 'error') {
        alert('Connect to metamask');
      }
      
    });
  }


  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    this.router.navigate(['']);
  }
}
