import { Component, Input, OnInit } from '@angular/core';
import { HtmlDataService } from 'src/app/services/html-data.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent implements OnInit {
  constructor(private htmlService: HtmlDataService) {}

  loading = false;

  ngOnInit() {
    this.htmlService.spinner.subscribe((data) => {
      this.loading = data;
    });
  }
}
