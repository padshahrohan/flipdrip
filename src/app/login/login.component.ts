import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ContractService } from '../contract.service';

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

  constructor(private router: Router, private contractService: ContractService) {

  }

  ngOnInit(): void {
    this.contractService.walletAddress$.subscribe((address) => {
      this.walletAddress = address;
    })
  }

  async login() {
    console.log(this.loginForm.value);
    
    //API call to match username and password and get user metadata
    this.router.navigate(['seller-landing']);
    
  }

  async connectWallet() {
    await this.contractService.connectWallet();
  }

  register(user: string) {
    this.router.navigate(['register/' + user]);
  }

}
