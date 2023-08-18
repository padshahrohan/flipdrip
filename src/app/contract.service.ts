import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ethers } from 'ethers';
import FlipKart from 'src/assets/Flipdrip.json';
import { environment } from 'src/environments/environment';

declare global {
  interface Window {
      ethereum?: any;
      web3?: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private provider: ethers.providers.Web3Provider;

  walletAddress: Subject<string> = new Subject<string>();
  walletAddress$ = this.walletAddress.asObservable();

  async transfer(walletAddress: string, amount: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      try {
        const amountInEther = ethers.utils.parseUnits(amount, 'ether');
        const contract = new ethers.Contract(environment.contractAddress, FlipKart.abi, this.provider.getSigner());
        contract['transfer'](walletAddress, amountInEther);
        resolve(true);
        console.log('Transfer successful');
      } catch (error) {
        resolve(false);
        console.error('Transfer Error:', error);
      }
    });
    
  }

  async connectWallet() {
    try {
      // Check if MetaMask is available
      if (typeof window.ethereum !== 'undefined') {
        this.provider = new ethers.providers.Web3Provider(window.ethereum);

        // Request access to accounts
        const accounts = await this.provider.send('eth_requestAccounts', []);

        if (accounts.length > 0) {
          this.walletAddress.next(accounts[0]);
        } else {
          console.log('No accounts found');
          
        }
      } else {
        console.log('MetaMask not found');
      }
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  }
}

