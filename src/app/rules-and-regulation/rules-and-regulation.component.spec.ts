import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesAndRegulationComponent } from './rules-and-regulation.component';

describe('RulesAndRegulationComponent', () => {
  let component: RulesAndRegulationComponent;
  let fixture: ComponentFixture<RulesAndRegulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RulesAndRegulationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RulesAndRegulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
