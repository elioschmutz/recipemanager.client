import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, FormValidationService, FormErrors, CustomValidators } from '../_services';
import { Router } from '@angular/router';
import { isEmpty } from 'lodash';


@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  loading = false;
  invalid = false;
  conflictError = false;
  successfullMessage = "Registration successful. Please log in with your newly created account"

  formErrors = new FormErrors();

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
              Validators.required,
              Validators.minLength(4),]],
          confirmPassword: ['', [
              Validators.required,
              Validators.minLength(4),
              CustomValidators.validatePasswordConfirmation(this)]],
          firstName: '',
          lastName: '',
      });

      this.form.valueChanges.subscribe(data => this.onValueChanged(data));

      this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
      this.validateForm();
  }
  validatePasswordConfirmation(control: FormControl): any {
      if(this.form) {
          return control.value === this.form.get('password').value ? null : { notSame: true}
      }

  }
  validateForm(force=false) {
      return this.formValidationService.validate(this.form, this.formErrors, force);
  }

  register() {
      this.invalid = false;
      this.conflictError = false;
      this.loading = true;
      let data = this.form.value;
      data['username'] = data['email'];
      this.authenticationService.register(this.form.value).subscribe((data) => {
          this.loading = false;
          this.router.navigate(['login']);
      }, (error) => {
          if (error.status == '409') {
              this.conflictError = true;
          } else {
              this.invalid = true;
          }
          this.loading = false;
      });

  }
}
