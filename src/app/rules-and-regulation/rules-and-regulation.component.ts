import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-rules-and-regulation',
  templateUrl: './rules-and-regulation.component.html',
  styleUrls: ['./rules-and-regulation.component.css']
})
export class RulesAndRegulationComponent {
  @Output() closeModalEvent = new EventEmitter();

  closeModal(): void {
    this.closeModalEvent.emit();
  }
}
