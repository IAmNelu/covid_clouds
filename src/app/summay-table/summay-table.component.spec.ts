import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummayTableComponent } from './summay-table.component';

describe('SummayTableComponent', () => {
  let component: SummayTableComponent;
  let fixture: ComponentFixture<SummayTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummayTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummayTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
