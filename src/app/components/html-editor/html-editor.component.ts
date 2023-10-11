import * as CodeMirror from 'codemirror';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/addon/hint/show-hint';
import { ProjectHandlerService } from 'src/app/services/project-handler.service';
import { HtmlDataService } from 'src/app/services/html-data.service';

@Component({
  selector: 'app-html-editor',
  templateUrl: './html-editor.component.html',
  styleUrls: ['./html-editor.component.css']
})
export class HtmlEditorComponent {

  constructor(private projectService:HtmlDataService){}

  @Input() el:HTMLElement | undefined;

  ngAfterViewInit() {

    const codeMirror = CodeMirror(this.el!, {
      value: this.projectService.htmlContent,
      mode: 'htmlmixed', 
      lineNumbers: true, 
      theme: 'default' ,
    });

    codeMirror.on('change', (editor, changeObj) => {
      const updatedContent = editor.getValue();
      this.projectService.htmlCodeChange.emit(updatedContent);      
    });

  
    
  }

  
}
