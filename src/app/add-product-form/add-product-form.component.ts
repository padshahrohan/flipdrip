import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContractService } from '../services/contract.service';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';
import { User } from 'src/model/user.model';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.css']
})
export class AddProductFormComponent implements OnInit {

  currentUser: User;
  productForm = new FormGroup({
    productName : new FormControl('', Validators.required),
    productDescription : new FormControl('', Validators.required),
    productPrice : new FormControl('', Validators.required),
    priceInTokens: new FormControl('', Validators.required)
  });

  constructor(private http: HttpClient, private userService: UserService,private productService:
    ProductService) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
  }

  submit() {
    console.log(this.currentUser);
    
    const productData = {
      SellerId: this.currentUser.ID,
      ProductDescription: this.productForm.value.productDescription,
      ProductPrice: this.productForm.value.productPrice,
      Tokens: this.productForm.value.priceInTokens,
      ProductName: this.productForm.value.productName
    };
    
    this.productService.addProduct(productData).subscribe(
    (response) => {
      console.log('Product added successfully:', response);
    },
    (error) => {
      console.error('Error adding product:', error);
    });
  }

  onImageChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];

    // if (file) {
      // Process the selected image file
    }
  }
}
