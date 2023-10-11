import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { ProjectHandlerService } from './project-handler.service';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class HtmlDataService {
  htmlContent: string = '';
  finalCss:string='';
  finalCssChange:EventEmitter<string>=new EventEmitter();

  spinner:EventEmitter<boolean> = new EventEmitter();

  @Output() htmlCodeChange: EventEmitter<string> = new EventEmitter();

  constructor(private projectService: ProjectHandlerService,private httpClient:HttpClient) {
    this.htmlCodeChange.subscribe((data) => {
      this.htmlContent = data;
    });

    this.projectService.projectDataChange.subscribe((data) => {
      this.cssString=[{
        '*': [
          {'border-color': 'blue'},
          {'border-style': 'solid'},
          {'border-width': '1px'},
        ],
      }];
      const propertyNames = Object.keys(data);
      for (const cl of propertyNames) {
        const singleclass = data[cl];
        if(singleclass!='null'){
          const propertyClass = Object.keys(singleclass);

          const tempCssHold: Record<string, string>[] = [];
    
          for (const attr of propertyClass) {
            const attrval = singleclass[attr];
            tempCssHold.push({ [attr]:attrval });
          }
          
          this.cssString.push({[cl]:tempCssHold});

        }        
      }
      
      this.finalCss=this.convertToCSS(this.cssString);
      this.finalCssChange.emit(this.finalCss);
      
    });
  }

  previewMobile: EventEmitter<any> = new EventEmitter();

  cssString!: Record<string, Record<string, string>[]>[];

  convertToCSS(data:Record<string, Record<string, string>[]>[]) {
    let cssString = '';
  
    data.forEach((item) => {
      for (const selector in item) {
        if (Object.hasOwnProperty.call(item, selector)) {
          if(selector!='*'){
            cssString += `.${selector} {\n`;
          }else{
            cssString += `${selector} {\n`;
          }
          const styles = item[selector];
  
          styles.forEach((styleObj) => {
            for (const styleName in styleObj) {
              if (Object.hasOwnProperty.call(styleObj, styleName)) {
                const styleValue = styleObj[styleName];
                cssString += `  ${styleName}: ${styleValue};\n`;
              }
            }
          });
  
          cssString += '}\n\n';
        }
      }
    });
  
    return cssString;
  }

  removeClass:EventEmitter<string> = new EventEmitter();

  fetchAllCssProperties(){
    return this.httpClient.get('assets/css-properties.txt',{responseType:'text'});
  }

  fullscreenChange:EventEmitter<boolean> = new EventEmitter();
  setFullScreen(yesNo:boolean){
    this.fullscreenChange.emit(yesNo)
  }
  
}
