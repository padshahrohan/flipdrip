import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerProgramDetailsComponent } from './buyer-program-details.component';

describe('BuyerProgramDetailsComponent', () => {
  let component: BuyerProgramDetailsComponent;
  let fixture: ComponentFixture<BuyerProgramDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerProgramDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerProgramDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
