import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HtmlDataService } from 'src/app/services/html-data.service';

@Component({
  selector: 'app-previewmobile',
  templateUrl: './previewmobile.component.html',
  styleUrls: ['./previewmobile.component.css']
})
export class PreviewmobileComponent {
  constructor(private htmlService:HtmlDataService,private _sanitizer:DomSanitizer){
    htmlService.previewMobile.subscribe((data)=>{
      this.safeHtml=this._sanitizer.bypassSecurityTrustResourceUrl(
        `data:text/html;charset=utf-8,${encodeURIComponent(data)}`
      )
    })
  }

  safeHtml!:SafeHtml;
}
