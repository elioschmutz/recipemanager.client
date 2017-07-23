import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/index';
import { User } from '../_models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) {

  }

  private user: User = null;

  ngOnInit() {
      this.user = this.authenticationService.getCurrentUser();
  }

}
