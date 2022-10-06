import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreakDaysComponent } from './streak-days.component';

describe('StreakDaysComponent', () => {
  let component: StreakDaysComponent;
  let fixture: ComponentFixture<StreakDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreakDaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreakDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
