import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionSettingsCardComponent } from './action-settings-card.component';

describe('ActionCardComponent', () => {
  let component: ActionSettingsCardComponent;
  let fixture: ComponentFixture<ActionSettingsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ActionSettingsCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionSettingsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
