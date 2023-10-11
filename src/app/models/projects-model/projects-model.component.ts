import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, map } from 'rxjs';
import { projectsArray } from './iprojects';
import { ProjectHandlerService } from 'src/app/services/project-handler.service';
import { HtmlDataService } from 'src/app/services/html-data.service';

@Component({
  selector: 'app-projects-model',
  templateUrl: './projects-model.component.html',
  styleUrls: ['./projects-model.component.css'],
})
export class ProjectsModelComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public userId: any,
    private auth: AuthService,
    private projectDialogRef: MatDialogRef<ProjectsModelComponent>,
    private projectService: ProjectHandlerService,
    private htmlService:HtmlDataService
  ) {}

  projects: projectsArray | undefined;

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.htmlService.spinner.emit(true);
    this.auth.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.htmlService.spinner.emit(false);
      },
      error: (err) => {
        console.log(err);
        this.htmlService.spinner.emit(false);
      },
    });
  }

  openProject(key: string) {
    this.htmlService.spinner.emit(true);
    this.projectService.loadProjectFiles(key).subscribe({
      next:(data)=>{
        this.htmlService.htmlCodeChange.emit(data);
        this.projectService.getClasses(key).subscribe({
          next:(data)=>{
            this.projectDialogRef.close()
            this.htmlService.spinner.emit(false);
          },error:(err)=>{
            console.log(err);
            this.projectDialogRef.close()
            this.htmlService.spinner.emit(false);
          }
        })
      },error:(err)=>{
        console.log(err);
        this.projectService.getClasses(key).subscribe({
          next:(data)=>{
            this.projectDialogRef.close()
            this.htmlService.spinner.emit(false);
          },error:(err)=>{
            console.log(err);
            this.projectDialogRef.close()
            this.htmlService.spinner.emit(false);
          }
        })
      }
    });
    
  }

 

  addNewProject(name: string) {
    this.htmlService.spinner.emit(true);
    const uidproject = new Date().getTime().toString(); 
    this.auth
      .createNewProject(name,uidproject)
      .then((data) => {
        this.getProjects();
      })
      .catch((err) => {
        console.log(err);
        this.htmlService.spinner.emit(false);
      });
  }
}
