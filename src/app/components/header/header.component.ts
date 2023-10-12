import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HtmlDataService } from 'src/app/services/html-data.service';
import { ProjectHandlerService } from 'src/app/services/project-handler.service';
import { AccountComponent } from '../account/account.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private htmlService:HtmlDataService,private projectService:ProjectHandlerService,private dialog:MatDialog,private authService:AuthService){}

  ngOnInit(): void {
    this.projectService.projectDataChange.subscribe(()=>{
      this.projectName=this.projectService.projectname;
    })
  }

  projectName='';

  setFullScreen(){
    this.htmlService.setFullScreen(true);
  }


  openAccountDialog(){
    const accountDialog = this.dialog.open(AccountComponent,{
      height:'fit-content',
      width:'450px'
    })

    const accountSubscription = accountDialog.afterClosed().subscribe((data)=>{
      accountSubscription.unsubscribe();
    })
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


