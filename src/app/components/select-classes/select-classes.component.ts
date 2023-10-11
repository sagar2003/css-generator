import { Component, OnInit } from '@angular/core';
import { HtmlDataService } from 'src/app/services/html-data.service';
import { ProjectHandlerService } from 'src/app/services/project-handler.service';

@Component({
  selector: 'app-select-classes',
  templateUrl: './select-classes.component.html',
  styleUrls: ['./select-classes.component.css']
})
export class SelectClassesComponent implements OnInit {

  constructor(private projectService:ProjectHandlerService,private htmlService:HtmlDataService){}

  classes: [] = [];

  ngOnInit(): void {
    this.projectService.classesToAplly.subscribe((data) => {
      this.classes = data.classes;
    });
  }

  handleSelectedClass(cla:any){
    cla=cla.toString();
    this.htmlService.removeClass.emit(cla);    
  }
}
