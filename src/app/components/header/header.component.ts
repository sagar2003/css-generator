import { Component, OnInit } from '@angular/core';
import { HtmlDataService } from 'src/app/services/html-data.service';
import { ProjectHandlerService } from 'src/app/services/project-handler.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private htmlService:HtmlDataService,private projectService:ProjectHandlerService){}

  ngOnInit(): void {
    this.projectService.projectDataChange.subscribe(()=>{
      this.projectName=this.projectService.projectname;
    })
  }

  projectName='';

  setFullScreen(){
    this.htmlService.setFullScreen(true);
  }
  
  async saveProject() {
    this.htmlService.spinner.emit(true);
      const htmlContent = this.htmlService.htmlContent;
      const cssContent = this.htmlService.finalCss;
      this.projectService.saveProject(htmlContent,cssContent).subscribe({
        next:(data)=>{
          this.htmlService.spinner.emit(false);
        },error:(err)=>{
          console.log(err);
          this.htmlService.spinner.emit(false);
          alert(err)
        }
      })
  }
 
}


