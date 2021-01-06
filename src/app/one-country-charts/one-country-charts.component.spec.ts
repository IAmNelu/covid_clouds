import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneCountryChartsComponent } from './one-country-charts.component';

describe('OneCountryChartsComponent', () => {
  let component: OneCountryChartsComponent;
  let fixture: ComponentFixture<OneCountryChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneCountryChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneCountryChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
