import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { forOwn, values, isEmpty } from "lodash";


export class FormErrors {
    errors: Object = {};

    constructor() { }

    reset(): void {
        this.errors = {};
    }
    hasErrors(fieldname: string=''): Boolean {
        if (fieldname != '') {
            return this.errors.hasOwnProperty(fieldname);
        }
        return isEmpty(this.errors);
    }
    addError(controlName, message) {
        if (!this.errors.hasOwnProperty(controlName)) {
            this.errors[controlName] = []
        }
        this.errors[controlName].push(message);
    }
}

export let CustomValidators = {
    validatePasswordConfirmation: (component) => {
        return function(control: FormControl): any {
            if(component.form) {
                return control.value === component.form.get('password').value ? null : { notSame: true}
            }
        }
    }
}

@Injectable()
export class FormValidationService {
    validationMessages = {
        'required': 'This field is required.',
        'email': 'Please enter a valid email address',
        'minlength': 'Enter more characters',
        'notSame': 'The confirmation password does not match',
    }
    constructor() { }

    validate(form: FormGroup, formErrors: FormErrors, force: Boolean=false ): Boolean {
        if (!form) { return; }

        formErrors.reset();
        forOwn(form.controls, (formControl, formControlName) => {
            if ((formControl && formControl.dirty && !formControl.valid) || force)  {
                forOwn(formControl.errors, (valid, validatorName) => {
                    formErrors.addError(formControlName, this.validationMessages[validatorName]);
                })
            }
        });
        return formErrors.hasErrors();
    }
}
