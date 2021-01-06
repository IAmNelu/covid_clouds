import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsGeneralComponent } from './news-general.component';

describe('NewsGeneralComponent', () => {
  let component: NewsGeneralComponent;
  let fixture: ComponentFixture<NewsGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
