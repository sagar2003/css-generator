import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { HtmlDataService } from 'src/app/services/html-data.service';
import { ProjectHandlerService } from 'src/app/services/project-handler.service';

@Component({
  selector: 'app-newattr',
  templateUrl: './newattr.component.html',
  styleUrls: ['./newattr.component.css'],
})
export class NewattrComponent implements OnInit, OnChanges {
  @Input() currentClass: string | undefined;
  attributes: any;
  allCssAttributes: string[] = [];

  currentAttribute: { attr: string; value: string } = { attr: '', value: '' };

  constructor(
    private projectService: ProjectHandlerService,
    private htmlService: HtmlDataService
  ) {}

  ngOnInit(): void {
   this.getCssFromFile();
   this.htmlService.finalCssChange.subscribe((data)=>{
    this.attributes = this.projectService.projectData[this.currentClass!];
   })
  }

  ngOnChanges(change: SimpleChanges) {
    const cclass = change['currentClass'].currentValue;
    if (this.projectService.projectData)
      this.attributes = this.projectService.projectData[cclass];
  }

  getCssFromFile(){
    this.htmlService.fetchAllCssProperties().subscribe({
      next: (data) => {
        this.allCssAttributes = data.split(',');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateCurrentAttribute(attr: string, val: string) {
    if (attr && attr != '') {
      this.currentAttribute.attr = attr.trim();
    }
    if (val && val != '') {
      this.currentAttribute.value = val;
    }
  }

  addAttribute() {
    if (this.currentClass) {
      this.projectService
        .addAttribute(
          this.currentClass,
          this.currentAttribute.attr,
          this.currentAttribute.value
        )
        .then((data) => {
          if (this.projectService.projectData && this.currentClass)
            this.attributes = this.projectService.projectData[this.currentClass];
          this.currentAttribute = { attr: '', value: '' };
        })
        .catch((err) => {
          console.log(err);
        });
    }else{
      alert('please select clss first')     
    }
  }

  removeAttr(key:any){
    this.projectService.removeAttr(this.currentClass!,key).then((data) => {
      if (this.projectService.projectData && this.currentClass)
        this.attributes = this.projectService.projectData[this.currentClass];
      this.currentAttribute = { attr: '', value: '' };
    })
    .catch((err) => {
      console.log(err);
    });
  }
}
