import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNewsModalComponent } from './edit-news-modal.component';

describe('EditNewsModalComponent', () => {
  let component: EditNewsModalComponent;
  let fixture: ComponentFixture<EditNewsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNewsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNewsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});