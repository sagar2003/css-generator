import { Component, OnInit } from '@angular/core';
import * as JSZip from 'jszip';
import { HtmlDataService } from 'src/app/services/html-data.service';
import { ProjectHandlerService } from 'src/app/services/project-handler.service';

@Component({
  selector: 'app-generatefile',
  templateUrl: './generatefile.component.html',
  styleUrls: ['./generatefile.component.css'],
})
export class GeneratefileComponent implements OnInit {
  constructor(
    private projectService: ProjectHandlerService,
    private htmlService: HtmlDataService
  ) {}

  classCount = 0;
  projectSize: { htmlSize: number; cssSize: number } = {
    htmlSize: 0,
    cssSize: 0,
  };

  getProjectSize() {
    const size = this.projectSize.cssSize + this.projectSize.htmlSize;
    if (size < 1000) {
      return size.toFixed(2) + ' bytes';
    } else if (size < 1000000) {
      return (size / 1000).toFixed(2) + ' KB';
    } else if (size < 1000000000) {
      return (size / 1000000).toFixed(2) + ' MB';
    } else {
      return size.toFixed(2) + ' bytes';
    }
  }

  exportProject() {
    this.htmlService.spinner.emit(true);
    this.projectService.downloadProject().subscribe({
      next: (data) => {
        let zip = new JSZip();
        zip.file('htmlFile.html', data.htmlBlob, { binary: true });
        zip.file('cssFile.css', data.cssBlob, { binary: true });
        zip.generateAsync({ type: 'blob' }).then((content) => {
          this.htmlService.spinner.emit(false);
          const downloadLink = document.createElement('a');
          const blobUrl = URL.createObjectURL(content);
          downloadLink.href = blobUrl;
          downloadLink.download = 'files.zip'; 
          downloadLink.click()
        }).catch((err)=>{
          console.log(err)
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.projectService.projectDataChange.subscribe((data) => {
      this.classCount = Object.keys(data).length;
    });
    this.htmlService.htmlCodeChange.subscribe((data) => {
      this.projectSize.htmlSize = data.length;
    });
    this.htmlService.finalCssChange.subscribe((data) => {
      this.projectSize.cssSize = data.length;
    });
  }
}
