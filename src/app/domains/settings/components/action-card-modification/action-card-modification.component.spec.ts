import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionCardModificationComponent } from './action-card-modification.component';

describe('ActionCardModificationComponent', () => {
  let component: ActionCardModificationComponent;
  let fixture: ComponentFixture<ActionCardModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ActionCardModificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionCardModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
