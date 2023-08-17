import { Component, OnInit} from '@angular/core';
import { ContractService } from '../contract.service';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements OnInit { 
  constructor(
    private contractService: ContractService,
  ) { }

  ngOnInit() {
    this.contractService.connectWallet();
   
  }

}
