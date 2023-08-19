import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ethers } from 'ethers';
import { environment } from 'src/environments/environment';
import flipkartAbi from 'src/assets/Flipdrip.json'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-seller-landing',
  templateUrl: './seller-landing.component.html',
  styleUrls: ['./seller-landing.component.css']
})
export class SellerLandingComponent {
  products: any[] = []; // Array to store fetched products
  showAddProductForm: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
      const sellerId = 3; // Replace with the actual seller ID

      // Make an HTTP GET request to fetch products by seller ID
      this.http.get<any>(`http://172.17.86.148:3000/product/list?SellerId=${sellerId}`).subscribe(
        (response) => {
          this.products = response.result; // Assign fetched products to the array
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
    }
    onApproveRewardPointsClick() {
      // Make your API call here to fetch user details
      // Once the data is fetched, navigate to the approve-reward-points route
      this.router.navigate(['/approve-reward-points']);
    }

   
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   await provider.send("eth_requestAccounts", []);
    
  //   const signer = provider.getSigner();
  //   const contract = new ethers.Contract(environment.contractAddress, flipkartAbi.abi, signer);

  //   const recipientAddress = '0x81B19fB3B2BF89D06f660fdE6158606CB7C437b5';
  //   const amount = ethers.utils.parseEther('1'); // Adjust the amount as needed

  //   try {
  //     const transaction = await contract['transferTokens'](recipientAddress, amount);
  //     await transaction.wait();
  //     console.log('Tokens transferred successfully');
  //   } catch (error) {
  //     console.error('Error transferring tokens:', error);
  //   }
}
