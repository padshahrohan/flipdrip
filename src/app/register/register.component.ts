import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractService } from '../services/contract.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isModalOpen = false;
  walletAddress: string;
  isBuyer = false;

  registerForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    acceptTerms: new FormControl(false, Validators.requiredTrue)
  });

  constructor(private router: Router, private contractService: ContractService, private http: HttpClient) {    
    
  }

  ngOnInit(): void {
    this.isBuyer = this.router.url.includes('buyer');
    this.contractService.walletAddress$.subscribe((address) => {
      this.walletAddress = address;
    })
  }

  agreeTerms() {
    const terms = this.registerForm.value.acceptTerms === true;
    this.registerForm.controls['acceptTerms'].setValue(terms);
  }

  register() {
    let body = {
      UserName : this.registerForm.value.email,
      UserPassword : this.registerForm.value.password,
      WalletAddress : this.walletAddress,
      Role : this.isBuyer ? 'buyer' : 'seller'
    }

    console.log(body);
    this.http.post("http://172.17.87.26:3000/user/register", body).subscribe((resp) => {
        this.router.navigate(['']);
    })
    
  }

  login() {
    this.router.navigate(['']);
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
