import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewdesktopComponent } from './previewdesktop.component';

describe('PreviewdesktopComponent', () => {
  let component: PreviewdesktopComponent;
  let fixture: ComponentFixture<PreviewdesktopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreviewdesktopComponent]
    });
    fixture = TestBed.createComponent(PreviewdesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
