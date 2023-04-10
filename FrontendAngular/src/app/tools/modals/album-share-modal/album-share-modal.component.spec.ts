import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumShareModalComponent } from './album-share-modal.component';

describe('AlbumShareModalComponent', () => {
  let component: AlbumShareModalComponent;
  let fixture: ComponentFixture<AlbumShareModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumShareModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumShareModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
