import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.css']
})
export class AddProductFormComponent {

  productForm = new FormGroup({
    productName : new FormControl('', Validators.required),
    productDescription : new FormControl('', Validators.required),
    productPrice : new FormControl('', Validators.required),
  });

  constructor(private http: HttpClient) { }

  submit() {
    const productData = {
      sellerID: 3,
      productName: this.productForm.value.productName,
      productDescription: this.productForm.value.productDescription,
      productPrice: this.productForm.value.productPrice
    };
    
    this.http.post('http://localhost:3000/addproduct', productData).subscribe(
    (response) => {
      console.log('Product added successfully:', response);
    },
    (error) => {
      console.error('Error adding product:', error);
    });
  }
}
