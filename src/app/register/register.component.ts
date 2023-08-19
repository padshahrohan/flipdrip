import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractService } from '../contract.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    acceptTerms: new FormControl(false, Validators.requiredTrue)
  });

  constructor(private router: Router, private contractService: ContractService) {    
    
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
      username : this.registerForm.value.username,
      email : this.registerForm.value.email,
      password : this.registerForm.value.password,
      walletAddress : this.walletAddress,
      role : this.isBuyer ? 'buyer' : 'seller'
    }

    console.log(body);
    this.router.navigate(['']);
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
