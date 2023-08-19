import { Component } from '@angular/core';
import { ethers } from 'ethers';
import { environment } from 'src/environments/environment';
import FlipKart from 'src/assets/Flipdrip.json';

@Component({
  selector: 'app-approve-reward-points',
  templateUrl: './approve-reward-points.component.html',
  styleUrls: ['./approve-reward-points.component.css']
})
export class ApproveRewardPointsComponent {
  users = [
    { userId: 1, rewardPoints: 100 },
    { userId: 2, rewardPoints: 200 },
    // Add more user data as needed
  ];

  async transferTokens(userAddress: string, tokensToTransfer: number) {
    
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      const contract = new ethers.Contract(environment.contractAddress, FlipKart.abi, signer);
      
      try {
        const txResponse = await contract['transfer'](userAddress, tokensToTransfer);
        console.log('Transaction hash:', txResponse.hash);
      } catch (error) {
        console.error('Error sending tokens:', error);
      }
    } else {
      console.error('Metamask not detected.');
    }
  }

  approveRewardPoints(userId: number, rewardPoints: number): void {
    // Implement the logic to approve reward points for the selected user
    this.transferTokens(userAddress, rewardPoints);


    console.log(`Reward points approved for user ID ${userId}`);
  }
}
