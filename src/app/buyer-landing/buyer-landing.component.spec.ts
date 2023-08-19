import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerLandingComponent } from './buyer-landing.component';

describe('BuyerLandingComponent', () => {
  let component: BuyerLandingComponent;
  let fixture: ComponentFixture<BuyerLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerLandingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
