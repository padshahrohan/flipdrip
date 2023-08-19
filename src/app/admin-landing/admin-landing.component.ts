import { Component, OnInit } from '@angular/core';
import { ContractService } from '../services/contract.service';
import { environment } from 'src/environments/environment';
import flipdripContractAbi from 'src/assets/Flipdrip.json';

@Component({
  selector: 'app-admin-landing',
  templateUrl: './admin-landing.component.html',
  styleUrls: ['./admin-landing.component.css']
})
export class AdminLandingComponent implements OnInit {
  records = [
    { id: 1, name: 'John Doe', email: 'john@example.com', walletAddress : '0x7c2714F9131b494BfaA1318aBFB8BbA93B9270F9' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', walletAddress: '0x36c03585b6Fa5EA59b56DEb2401Df342ff7b6e04' },
    // Add more records as needed
  ];

  constructor(private contractService: ContractService) {
    
  }

  ngOnInit(): void {
    this.contractService.connectWallet();
  }

  async doTransaction(record: any) {
    const address = record.walletAddress;
    const result = await this.contractService.transfer(record.walletAddress, '5000');

    if (result) {
      //http call to delete the entry from DB
    } else {
      alert(' Transaction Unsuccessful !!');
    }
  }
}
