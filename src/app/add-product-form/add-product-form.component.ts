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
    priceInTokens: new FormControl('', Validators.required)
  });

  constructor(private http: HttpClient) { }

  submit() {
    const productData = {
      SellerId: 3,
      ProductDescription: this.productForm.value.productDescription,
      ProductPrice: this.productForm.value.productPrice,
      Tokens: this.productForm.value.priceInTokens,
      ProductName: this.productForm.value.productName
    };
    
    this.http.post('http://172.17.86.148:3000/product/add', productData).subscribe(
    (response) => {
      alert('Product added successfully');
      console.log('Product added successfully:', response);
      window.location.reload();
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
