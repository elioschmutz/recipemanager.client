import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, FormValidationService, FormErrors } from '../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  formErrors = new FormErrors();

  loading = false;
  invalid = false;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private fb: FormBuilder,
              private formValidationService: FormValidationService) {
      this.createForm();
  }

  ngOnInit() {}

  createForm() {
      this.form = this.fb.group({
          email: ['', [
              Validators.required,
              Validators.email]],
          password: ['', [
              Validators.required,]],
      });

      this.form.valueChanges.subscribe(data => this.onValueChanged(data));

      this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
      this.validateForm();
  }

  validateForm(force=false) {
      return this.formValidationService.validate(this.form, this.formErrors, force);
  }

  login() {
      this.invalid = false;
      this.loading = true;
      this.authenticationService.login(this.form.value.email, this.form.value.password).subscribe((data) => {
          this.loading = false;
          this.router.navigate(['/']);
      }, (error) => {
          this.loading = false;
          this.invalid = true;
      });

  }

}
