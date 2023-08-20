import { Component, EventEmitter, Output } from '@angular/core';
import { ContractService } from '../services/contract.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rules-and-regulation',
  templateUrl: './rules-and-regulation.component.html',
  styleUrls: ['./rules-and-regulation.component.css']
})
export class RulesAndRegulationComponent {
  @Output() closeModalEvent = new EventEmitter();

  walletAddress: string;
  walletConnected = false;
  isBuyer = false;

  constructor(private contractService: ContractService, private router: Router) {
    this.isBuyer = router.url.includes('buyer');
    this.contractService.walletAddress$.subscribe((address) => {
      this.walletAddress = address;

      if (this.walletAddress) {
        this.walletConnected  = true;
      }
    })
  }

  closeModal(): void {
    this.closeModalEvent.emit();
  }

  async connectWallet() {
    await this.contractService.connectWallet();
  }
}
