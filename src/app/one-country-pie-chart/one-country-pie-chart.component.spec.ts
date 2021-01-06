import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneCountryPieChartComponent } from './one-country-pie-chart.component';

describe('OneCountryPieChartComponent', () => {
  let component: OneCountryPieChartComponent;
  let fixture: ComponentFixture<OneCountryPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneCountryPieChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneCountryPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
