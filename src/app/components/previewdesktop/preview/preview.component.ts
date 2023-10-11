import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HtmlDataService } from 'src/app/services/html-data.service';
import { ProjectHandlerService } from 'src/app/services/project-handler.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
})

export class PreviewComponent implements OnInit {
  htmlCode: string = '';
  safeHtml!: SafeHtml;
  constructor(
    private htmlService: HtmlDataService,
    private _sanitizer: DomSanitizer,
    private projectHandler: ProjectHandlerService
  ) {}

  cssString = '';
  fullScreen = false;

  @ViewChild('desktopFrame') frame!: ElementRef;

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    this.projectHandler.classesToAplly.emit(event.data);
    var innerhtml: string = event.data.inner;
    if (innerhtml) {
      this.htmlService.htmlCodeChange.emit(event.data.inner);
      this.htmlService.previewMobile.emit(
        event.data.inner + `<style>${this.cssString}</style>`
      );
    }
  }

  ngOnInit(): void {
    this.cssString = this.htmlService.finalCss;
    this.projectHandler.classesToAplly.emit('');

    if (this.cssString && this.cssString != '') {
      this.updatePreview();
    }
    const cssSubscribe = this.htmlService.finalCssChange.subscribe((data) => {
      this.cssString = data;
      this.htmlCode = this.htmlService.htmlContent;
      this.updatePreview();
    });
    const classRemoveSubscriber = this.htmlService.removeClass.subscribe(
      (data) => {
        this.frame.nativeElement.contentWindow.postMessage(
          { call: 'updateClass', value: data },
          '*'
        );
      }
    );
    this.htmlService.fullscreenChange.subscribe((data)=>{
      if(data){
        this.fullScreen=true;
      }else{
        this.fullScreen=false;
      }
    })
  }

  updatePreview() {
    this.htmlCode = this.htmlService.htmlContent;
    let array = this.stringToArray(this.htmlCode);

    this.htmlCode = `<style>${this.cssString}</style>` + this.htmlCode;

    this.htmlService.previewMobile.emit(this.htmlCode);

    array.forEach((value) => {
      this.htmlCode = this.htmlCode.replace(
        new RegExp(`<${value}`, 'g'),
        `<${value} onclick='handle(event)' ondragover="allowDrop(event)" ondrop="drop(event)"`
      );
    });

    this.htmlCode =
      `<script>
      let ele;
      function handle(event){
        ele=event.target;
        event.stopPropagation();
        window.parent.postMessage({classes:Array.from(ele.classList)},'*');
      }
      function allowDrop(even) {
        even.preventDefault();
      } 
      function drop(even) {
        ele=even.target;
        even.preventDefault();
        var fetchData = even.dataTransfer.getData("text");
        even.target.classList.remove(fetchData);
        even.target.classList.add(fetchData);
        next();
      }
      function next(){
        const clone = document.documentElement.cloneNode(true);
        const scriptElements = clone.querySelectorAll('script');
        scriptElements.forEach((scriptElement) => {
          scriptElement.parentNode.removeChild(scriptElement);
        });
        const styleElements = clone.querySelectorAll('style');
        styleElements.forEach((styleElement) => {
          styleElement.parentNode.removeChild(styleElement);
        });
        const elementsWithAttributesToRemove = clone.querySelectorAll('[onclick], [ondragover], [ondrop]');
        elementsWithAttributesToRemove.forEach((element) => {
          element.removeAttribute('onclick');
          element.removeAttribute('ondragover');
          element.removeAttribute('ondrop');
        });
        window.parent.postMessage({classes:Array.from(ele.classList),inner:clone.innerHTML},'*');
      }
      window.addEventListener('message', function(event) {
        var origin = event.origin || event.originalEvent.origin;
        if (typeof event.data == 'object' && event.data.call=='updateClass') {
            ele.classList.remove(event.data.value)
            next();
        }
      }, false);
    </script>
    ` + this.htmlCode;

    this.safeHtml = this._sanitizer.bypassSecurityTrustResourceUrl(
      `data:text/html;charset=utf-8,${encodeURIComponent(this.htmlCode)}`
    );
  }

  stringToArray(val: string) {
    let array: string[] = [];
    var pushstring = '';
    var openTag = false;
    for (let i = 0; i < val.length; i++) {
      if (
        (openTag && val.charAt(i) == ' ') ||
        (val.charAt(i) == '>' && pushstring != '')
      ) {
        if (!array.includes(pushstring)) {
          array.push(pushstring);
        }
        openTag = false;
        pushstring = '';
      } else if (openTag) {
        pushstring += val.charAt(i);
      } else if (val.charAt(i) == '<' && val.charAt(i + 1) != '/') {
        openTag = true;
      }
    }
    return array;
  }
}
