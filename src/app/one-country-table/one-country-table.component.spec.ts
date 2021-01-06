import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneCountryTableComponent } from './one-country-table.component';

describe('OneCountryTableComponent', () => {
  let component: OneCountryTableComponent;
  let fixture: ComponentFixture<OneCountryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneCountryTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneCountryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
