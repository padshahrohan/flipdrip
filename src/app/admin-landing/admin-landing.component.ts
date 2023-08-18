import { Component, OnInit } from '@angular/core';
import { ContractService } from '../contract.service';
import { environment } from 'src/environments/environment';
import flipdripContractAbi from 'src/assets/Flipdrip.json';
import Web3 from 'web3';

@Component({
  selector: 'app-admin-landing',
  templateUrl: './admin-landing.component.html',
  styleUrls: ['./admin-landing.component.css']
})
export class AdminLandingComponent implements OnInit {
  records = [
    { id: 1, name: 'John Doe', email: 'john@example.com', walletAddress : '0x4086c68ddb355B475331e2E9e8C961a7fA002C72' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', walletAddress: '0xE48bDc73930dCDA973D10a9262418A93DA5b7e1F' },
    // Add more records as needed
  ];

  constructor(private contractService: ContractService) {
    
  }

  ngOnInit(): void {
    this.contractService.connectWallet();
  }

  async doTransfer(userWalletAddress: string) {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const web3 = new Web3(window.ethereum);


        // Token contract address
        const tokenContractAddress = environment.contractAddress; // Address of the token contract

        // Instantiate the token contract
        const tokenContract = new web3.eth.Contract(flipdripContractAbi.abi, tokenContractAddress);

        // Call the transfer function to transfer tokens to user's address
        const amountToSend = web3.utils.toWei('10', 'ether'); // Amount to transfer in Wei
        const result = await tokenContract.methods.transfer(userWalletAddress, amountToSend).send({
          from: userWalletAddress
        });

        console.log('Tokens transferred:', result);

      } catch (error) {
        console.error('Error transferring tokens:', error);

      }
    } else {
      console.error('MetaMask not found.');
    }
  }

  async doTransaction(record: any) {
    const address = record.walletAddress;
    await this.doTransfer(record.walletAddress);
  }
}
