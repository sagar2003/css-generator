import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratefileComponent } from './generatefile.component';

describe('GeneratefileComponent', () => {
  let component: GeneratefileComponent;
  let fixture: ComponentFixture<GeneratefileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneratefileComponent]
    });
    fixture = TestBed.createComponent(GeneratefileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
