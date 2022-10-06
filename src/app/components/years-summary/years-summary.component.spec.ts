import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearsSummaryComponent } from './years-summary.component';

describe('YearsSummaryComponent', () => {
  let component: YearsSummaryComponent;
  let fixture: ComponentFixture<YearsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearsSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YearsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
