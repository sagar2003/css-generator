import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsseditorComponent } from './csseditor.component';

describe('CsseditorComponent', () => {
  let component: CsseditorComponent;
  let fixture: ComponentFixture<CsseditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CsseditorComponent]
    });
    fixture = TestBed.createComponent(CsseditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
