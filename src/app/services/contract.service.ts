import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ethers } from 'ethers';
import FlipKart from 'src/assets/Flipdrip.json';
import { environment } from 'src/environments/environment';
import { formatEther, parseEther, parseUnits } from 'ethers/lib/utils';
import { getTransactionReceipt } from 'web3/lib/commonjs/eth.exports';

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

  balance: Subject<string> = new Subject<string>();
  balance$ = this.balance.asObservable();
  
  async transfer(toAddress: string, amount: string) {
    const contract = new ethers.Contract(environment.contractAddress, FlipKart.abi, this.provider.getSigner());
    const transferred = await contract['transfer'](toAddress, parseEther(amount));
    console.log('Transfer successful');
    return transferred;
  }

  async getBalance(address: string) {
    const contract = new ethers.Contract(environment.contractAddress, FlipKart.abi, this.provider.getSigner());
    const balance = await contract['balanceOf'](address);
    const fds = ethers.utils.formatUnits(balance, 18);
    this.balance.next(fds);
    return fds;
  }
  
  async connectWallet() {
    try {
      // Check if MetaMask is available
      if (typeof window.ethereum !== 'undefined') {
        this.provider = new ethers.providers.Web3Provider(window.ethereum);

        // Request access to accounts
        const accounts = await this.provider.send('eth_requestAccounts', []);

        if (accounts.length > 0) {
          console.log(accounts[0]);
          
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

