import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewattrComponent } from './newattr.component';

describe('NewattrComponent', () => {
  let component: NewattrComponent;
  let fixture: ComponentFixture<NewattrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewattrComponent]
    });
    fixture = TestBed.createComponent(NewattrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
