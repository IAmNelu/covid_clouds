import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneCountryLineComponent } from './one-country-line.component';

describe('OneCountryLineComponent', () => {
  let component: OneCountryLineComponent;
  let fixture: ComponentFixture<OneCountryLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneCountryLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneCountryLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
