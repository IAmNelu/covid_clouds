import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneCountryHistoComponent } from './one-country-histo.component';

describe('OneCountryHistoComponent', () => {
  let component: OneCountryHistoComponent;
  let fixture: ComponentFixture<OneCountryHistoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneCountryHistoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneCountryHistoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
