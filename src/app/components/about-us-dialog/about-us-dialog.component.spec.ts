import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsDialogComponent } from './about-us-dialog.component';

describe('AboutUsDialogComponent', () => {
  let component: AboutUsDialogComponent;
  let fixture: ComponentFixture<AboutUsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutUsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutUsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
