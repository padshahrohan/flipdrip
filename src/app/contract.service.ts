import { Injectable } from '@angular/core';
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

  async connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      // Modern dapp browsers
      this.web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable(); // Request account access
      } catch (error) {
        console.error('User denied account access');
      }
    } else if (typeof window.web3 !== 'undefined') {
      // Legacy dapp browsers
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      alert('No web3 provider detected!! Install Metamask');
    }
  }

}
