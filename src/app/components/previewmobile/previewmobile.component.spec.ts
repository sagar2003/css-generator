import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewmobileComponent } from './previewmobile.component';

describe('PreviewmobileComponent', () => {
  let component: PreviewmobileComponent;
  let fixture: ComponentFixture<PreviewmobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreviewmobileComponent]
    });
    fixture = TestBed.createComponent(PreviewmobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
