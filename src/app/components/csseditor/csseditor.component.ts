import { Component, OnInit } from '@angular/core';
import { HtmlDataService } from 'src/app/services/html-data.service';
import { ProjectHandlerService } from 'src/app/services/project-handler.service';

@Component({
  selector: 'app-csseditor',
  templateUrl: './csseditor.component.html',
  styleUrls: ['./csseditor.component.css'],
})
export class CsseditorComponent implements OnInit {
  constructor(
    private htmlService: HtmlDataService,
    private projectHandler: ProjectHandlerService
  ) {}

  cssText = '';

  ngOnInit(): void {
    this.htmlService.finalCssChange.subscribe((data) => {
      this.cssText = data;
    });
  }

  generateObj() {
    var newCssText = '';

    const classesWithData = this.cssText.split('}');
    classesWithData.splice(classesWithData.indexOf(classesWithData.at(0)!),1)
    classesWithData.pop()
    
    for (let data of classesWithData) {
      newCssText += data + '},';
    }

    newCssText=newCssText.replaceAll('.','');
    const objs = newCssText.split(',');
    objs.pop()

    let finalCssText = '';
    for(let obj of objs){
      const singleAttrs = obj.split('{')[1];
      finalCssText+='"'+obj.split('{')[0]?.trim()+'":{';

      const attrs = singleAttrs.split(';')
      attrs.pop()

      for(let attr of attrs){
        const singleAttrKeyVal = attr.split(':');
        if(attrs.indexOf(attr)==attrs.length-1){
          finalCssText+='"'+singleAttrKeyVal.at(0)?.trim()+'":"'+singleAttrKeyVal.at(1)?.trim()+'"'
        }else{
          finalCssText+='"'+singleAttrKeyVal.at(0)?.trim()+'":"'+singleAttrKeyVal.at(1)?.trim()+'",'
        }
      }
      if(objs.indexOf(obj)==objs.length-1){
        finalCssText+='}'
      }else{
        finalCssText+='},'
      }
      
    }
        
    finalCssText='{'+finalCssText+"}"
    
    this.projectHandler.setClasses(JSON.parse(finalCssText)).then((data)=>{

    }).catch((err)=>{
      console.log(err);

    });
  }
}
