import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProjectHandlerService } from 'src/app/services/project-handler.service';

@Component({
  selector: 'app-classlist',
  templateUrl: './classlist.component.html',
  styleUrls: ['./classlist.component.css'],
})
export class ClasslistComponent implements OnInit {
  constructor(private projectService: ProjectHandlerService) {}

  @Output() selectedClass:EventEmitter<string> = new EventEmitter();

  newclass = false;

  classes: [] = [];
  classesToApply:string[]=[];

  ngOnInit(): void {
    this.projectService.projectDataChange.subscribe((data) => {
      this.classes = data;
    });
    this.projectService.classesToAplly.subscribe((data)=>{
      this.classesToApply=data;
    })
  }

  selectClass(key:string){
    this.selectedClass.emit(key);
  }

  handleDrag(event:DragEvent,data:string){
    event.dataTransfer!.setData('text/plain', data);
  }

  createClass(name: string) {
    this.projectService
      .addClass(name)
      .then((data) => {
        this.selectedClass.emit(name);
        this.newclass=false;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
