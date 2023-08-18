import { Component, OnInit } from '@angular/core';
import { ContractService } from '../contract.service';
import { environment } from 'src/environments/environment';
import flipdripContractAbi from 'src/assets/Flipdrip.json';

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

  async doTransaction(record: any) {
    const address = record.walletAddress;
    const result = await this.contractService.transfer(record.walletAddress, '1');

    if (result) {
      //http call to delete the entry from DB
    } else {
      alert(' Transaction Unsuccessful !!');
    }
  }
}
