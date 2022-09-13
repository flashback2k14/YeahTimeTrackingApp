import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionDashboardCardComponent } from './action-dashboard-card.component';

describe('ActionDashboardCardComponent', () => {
  let component: ActionDashboardCardComponent;
  let fixture: ComponentFixture<ActionDashboardCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ActionDashboardCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionDashboardCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
