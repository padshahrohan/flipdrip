import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { User } from 'src/model/user.model';
import { ContractService } from '../services/contract.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  walletAddress: string;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private router: Router, private contractService: ContractService
    , private http: HttpClient, private userService: UserService) {

  }

  ngOnInit(): void {
    this.contractService.walletAddress$.subscribe((address) => {
      this.walletAddress = address;
    })
  }

  async login() {
    console.log(this.loginForm.value);
    let body = {
      UserName: this.loginForm.value.email,
      UserPassword: this.loginForm.value.password,
      WalletAddress: this.walletAddress,
    }
    
    this.userService.login(body).subscribe((resp: User) => {
      console.log(resp.Role);
      
      if (resp.Role === 'admin') {
        this.router.navigate(['admin-landing']);  
      } else if (resp.Role === 'buyer') {
        this.router.navigate(['buyer-landing']);
      } else if (resp.Role === 'seller'){
        this.router.navigate(['seller-landing']);
      } else {
        alert('Some error occurred ! Try after some time');
      }
    }, (err) => {

    });
    
  }

  async connectWallet() {
    await this.contractService.connectWallet();
  }

  register(user: string) {
    this.router.navigate(['register/' + user]);
  }

}
