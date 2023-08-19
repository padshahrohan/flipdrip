import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractService } from '../services/contract.service';
import { UserService } from '../services/user.service';
import { User } from 'src/model/user.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isDropdownOpen = false;
  
  currentUser: User;

  walletAddrress: string = "";
  
  constructor(private router: Router , private userService: UserService) {

  }

  ngOnInit(): void {  
    this.userService.user$.subscribe((user) => {
      this.currentUser = user;
      console.log(this.currentUser);
      
    })
  }


  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    this.router.navigate(['']);
  }
}
