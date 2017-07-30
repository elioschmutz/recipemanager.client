import { Component, OnInit } from '@angular/core';
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit() {
    $(".button-collapse").sideNav({menuWidth: 250});
    $(".dropdown-button").dropdown();
  }
}
