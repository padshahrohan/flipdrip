import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ContractService } from '../contract.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private router: Router) {

  }

  login() {
    console.log(this.loginForm.value);

    //API call to match username and password and get user metadata
    this.router.navigate(['admin-landing']);
    
  }

  register(user: string) {
    if (user === 'buyer') {
      this.router.navigate(['register/buyer']);
    } else {
      this.router.navigate(['register/seller']);
    }
    
  }

}
