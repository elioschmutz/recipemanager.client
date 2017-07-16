import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/index';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  loading = false;
  invalid = false;

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {}

  login() {
      this.loading = true;
      this.authenticationService.login(this.username, this.password).subscribe((data) => {
          this.loading = false;
          this.invalid = false;
          console.log('logged in');
          this.router.navigate(['/dashboard']);
      }, (error) => {
          console.log('new error:');
          this.loading = false;
          this.invalid = true;
      });

  }

}
