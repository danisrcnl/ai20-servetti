import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-page-not-found',
  template: `
    <h2>
      Page not found
    </h2>
  `
})

export class PageNotFoundComponent implements OnInit {

  path: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {  }
}