import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './_services';
import { User } from './_models';
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  user: User;

  constructor(private authenticationService: AuthenticationService) {  }

  ngOnInit() {
      this.user = this.authenticationService.getCurrentUser();
      $(".button-collapse").sideNav({menuWidth: 250});
      $(".dropdown-button").dropdown();
  }
}
