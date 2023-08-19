import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveRewardPointsComponent } from './approve-reward-points.component';

describe('ApproveRewardPointsComponent', () => {
  let component: ApproveRewardPointsComponent;
  let fixture: ComponentFixture<ApproveRewardPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveRewardPointsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveRewardPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
