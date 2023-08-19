import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';
import { environment } from 'src/environments/environment';
import FlipKart from 'src/assets/Flipdrip.json';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-approve-reward-points',
  templateUrl: './approve-reward-points.component.html',
  styleUrls: ['./approve-reward-points.component.css']
})
export class ApproveRewardPointsComponent implements OnInit{
  users: any[] = [];

  ngOnInit() {
    this.fetchUserDetails();
  }

  constructor(private http: HttpClient) {}

  fetchUserDetails() {
    const sellerId = 1; // Replace with the actual seller ID

    // Make an HTTP GET request to fetch products by seller ID
    this.http.get<any>(`http://172.17.86.148:3000/seller/getApprovalListOfBuyers?SellerId=${sellerId}`).subscribe(
      (response) => {
        this.users = response.buyerDetails; // Assign fetched products to the array
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  async transferTokens(userAddress: string, tokensToTransferInEther: number) {
    const tokensToTransferInWei = ethers.utils.parseEther(tokensToTransferInEther.toString());
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      const contract = new ethers.Contract(environment.contractAddress, FlipKart.abi, signer);
      
      try {
        const txResponse = await contract['transfer'](userAddress, tokensToTransferInWei);
        console.log('Transaction hash:', txResponse.hash);
        alert("Token transfer approved!");
        window.location.reload();

      } catch (error) {
        console.error('Error sending tokens:', error);
      }
    } else {
      console.error('Metamask not detected.');
    }
  }

  approveRewardPoints(userAddress: string, rewardPoints: number): void {
    this.transferTokens(userAddress, rewardPoints);
    console.log(`Reward points approved for wallet address ${userAddress}`);
  }
}
