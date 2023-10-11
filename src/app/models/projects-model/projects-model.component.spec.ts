import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsModelComponent } from './projects-model.component';

describe('ProjectsModelComponent', () => {
  let component: ProjectsModelComponent;
  let fixture: ComponentFixture<ProjectsModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsModelComponent]
    });
    fixture = TestBed.createComponent(ProjectsModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
