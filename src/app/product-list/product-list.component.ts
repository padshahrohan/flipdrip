import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products = [
    {
      name: 'Cricket BAT',
      description: 'GM BAT',
      price: 1999,
      image: 'assets/images/one.jpg'
    },
    {
      name: 'Cricket BAT',
      description: 'Kookaburra BAT',
      price: 2999,
      image: 'assets/images/two.jpg'
    },
    // Add more products as needed
  ];
}
