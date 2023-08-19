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

  async transfer(toAddress: string, amount: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      try {
        const contract = new ethers.Contract(environment.contractAddress, FlipKart.abi, this.provider.getSigner());
        contract['transfer'](toAddress, parseEther(amount));
        resolve(true);
        console.log('Transfer successful');
      } catch (error) {
        resolve(false);
        console.error('Transfer Error:', error);
      }
    });
    
  }

  async getBalance(address: string) {
    return this.provider.getBalance(address);
  }

  async getTransactionHistory (address: any) {
    console.log(address);
    
    const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');
    const latestBlockNumber = await provider.getBlockNumber();
    console.log(latestBlockNumber);
    
    const history: any[] = [];
    // Iterate through blocks and fetch transactions
    for (let blockNumber = 0; blockNumber <= latestBlockNumber; blockNumber++) {
      const block = await provider.getBlockWithTransactions(blockNumber);
      console.log(block.transactions);
      
      // Filter transactions for the specified address
      const transactions = block.transactions
                          .filter(tx => (tx.from && tx.to) && (tx.from.toLowerCase() === address || tx.to.toLowerCase() === address))
                          .map(tx => {
                            console.log(tx);
                            
                              let body = {
                                to: tx.to,
                                from: tx.from,
                                value: '',
                                gas: tx.gasPrice
                              }
                              provider.getTransactionReceipt(tx.hash).then(receipt => {
                                receipt.logs.forEach(log => {
                                  body.value = ethers.utils.formatUnits(ethers.BigNumber.from(log.data), 18);
                                });
                              });
                              history.push(body);
                          });
    }

    return history;
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

