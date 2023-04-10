import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveConfirmModalComponent } from './move-confirm-modal.component';

describe('MoveConfirmModalComponent', () => {
  let component: MoveConfirmModalComponent;
  let fixture: ComponentFixture<MoveConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoveConfirmModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
