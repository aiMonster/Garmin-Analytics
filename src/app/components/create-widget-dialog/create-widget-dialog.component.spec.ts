import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWidgetDialogComponent } from './create-widget-dialog.component';

describe('CreateWidgetDialogComponent', () => {
  let component: CreateWidgetDialogComponent;
  let fixture: ComponentFixture<CreateWidgetDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWidgetDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateWidgetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
