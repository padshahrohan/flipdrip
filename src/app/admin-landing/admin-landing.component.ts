import { Component, OnInit } from '@angular/core';
import { ContractService } from '../services/contract.service';
import { environment } from 'src/environments/environment';
import flipdripContractAbi from 'src/assets/Flipdrip.json';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { User } from 'src/model/user.model';

@Component({
  selector: 'app-admin-landing',
  templateUrl: './admin-landing.component.html',
  styleUrls: ['./admin-landing.component.css']
})
export class AdminLandingComponent implements OnInit {
  records: User[] = [];

  constructor(private contractService: ContractService, private http: HttpClient, private userService: UserService) {
    
  }

  async ngOnInit() {
    await this.contractService.connectWallet();
    this.userService.getApprovalListOfSellers().subscribe((resp) => {
      this.records = resp.result ? resp.result : [];
    });
  }

  async doTransaction(record: User) {
    const result = await this.contractService.transfer(record.WalletAddress, '5000');

    if (result) {
      this.userService.approveSellerTokens(record.UserID).subscribe(() => {
        this.userService.getApprovalListOfSellers().subscribe((resp) => {
          this.records = resp.result ? resp.result : [];
        })
      })
    } else {
      alert(' Transaction Unsuccessful !!');
    }
  }
}
