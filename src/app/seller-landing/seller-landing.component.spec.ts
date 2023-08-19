import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerLandingComponent } from './seller-landing.component';

describe('SellerLandingComponent', () => {
  let component: SellerLandingComponent;
  let fixture: ComponentFixture<SellerLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerLandingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
