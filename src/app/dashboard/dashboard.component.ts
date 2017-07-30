import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services';
import { CategoryService } from '../_services';
import { User } from '../_models';
import { Category } from '../_models';
import { Observable } from 'rxjs/Observable';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidationService, FormErrors } from '../_services';
declare var Materialize :any;
// import 'materialize-css';
// import 'materialize-css/js/toasts';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    editMode = false;
    loading = false;

    addCategoryForm: FormGroup;
    addCategoryFormErrors = new FormErrors();

    constructor(private authenticationService: AuthenticationService,
                private categoryService: CategoryService,
                private fb: FormBuilder,
                private formValidationService: FormValidationService) {

    }

    private user: User = null;
    private categories: Array<Category> = null;

    ngOnInit() {
        this.user = this.authenticationService.getCurrentUser();
        this.categoryService.getAll().subscribe((data) => {
            this.categories = data;
        });

        this.createAddCategoryForm();
    }
    createAddCategoryForm() {
        this.addCategoryForm = this.fb.group({
            title: ['', [Validators.required]]
        });

        this.addCategoryForm.valueChanges.subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now
    }

    onValueChanged(data?: any) {
        this.validateForm();
    }
    toggleEditMode() {
        this.editMode = !this.editMode;
    }
    validateForm(force=false) {
        return this.formValidationService.validate(this.addCategoryForm, this.addCategoryFormErrors, force);
    }
    createCategory() {
        this.editMode = false;
        this.categoryService.createOne(this.addCategoryForm.value.title).subscribe(
            (data) => {
                Materialize.toast("Category " + data.title + " created!", 4000)
                this.addCategoryForm.reset();
                this.categories.push(data);
            }, (error) => {

            }, () => {

            });
    }

    removeCategory(category, index) {
        Materialize.toast("Category " + category.title + " removed!", 4000)
        this.categories.splice(index, 1);
        this.categoryService.remove(category._id).subscribe(
            (data) => {
            }, (error) => { console.log(error) });;
    }
}
