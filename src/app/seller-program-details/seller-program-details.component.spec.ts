import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerProgramDetailsComponent } from './seller-program-details.component';

describe('SellerProgramDetailsComponent', () => {
  let component: SellerProgramDetailsComponent;
  let fixture: ComponentFixture<SellerProgramDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerProgramDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerProgramDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
