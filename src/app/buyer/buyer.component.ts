import { Component, OnInit} from '@angular/core';
import { ContractService } from '../services/contract.service';
import { UserService } from '../services/user.service';

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
      
  }

}
