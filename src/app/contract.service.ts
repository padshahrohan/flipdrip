import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import Web3 from "web3";

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
  web3: any;

  walletAddress: Subject<string> = new Subject<string>();
  walletAddress$ = this.walletAddress.asObservable();

  async connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      
      // Request access to the user's accounts
      window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts: string[]) => {
        const selectedAccount = accounts[0];
        
        console.log('Connected to MetaMask with address:', selectedAccount);
        this.walletAddress.next(selectedAccount);
      }).catch((error: any) => {
        console.error('Error connecting to MetaMask:', error);
      });
    } else {
      this.walletAddress.next('error');
      console.error('MetaMask not found.');
    }
  }
}

