import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services';
import { CategoryService } from '../_services';
import { User } from '../_models';
import { Category } from '../_models';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private categoryService: CategoryService) {

  }

  private newCategoryTitle: String = '';
  private user: User = null;
  private categories: Array<Category> = null;

  ngOnInit() {
      this.user = this.authenticationService.getCurrentUser();
      this.categoryService.getAll().subscribe((data) => {
          this.categories = data;
      });
  }

  createCategory() {
      this.categoryService.createOne(this.newCategoryTitle).subscribe(
          (data) => {
              this.categories.push(data);
          }, (error) => {

          }, () => {
              this.newCategoryTitle = '';
          });
  }

  removeCategory(category, index) {
      this.categories.splice(index, 1);
      this.categoryService.remove(category._id).subscribe(
          (data) => {
      }, (error) => { console.log(error) });;
  }
}
