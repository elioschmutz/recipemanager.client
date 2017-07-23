import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../_models';
import { Category } from '../_models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { ConfigService } from './config.service';

@Injectable()
export class CategoryService {

  constructor(private http: HttpClient,
              private config: ConfigService) { }

  getAll(): Observable<Array<Category>> {
      return this.http.get(this.config.getApiEndpoint('allCategories'));
  }
  createOne(title: String): Observable<Category> {
      if (title === '') {
          return Observable.throw(new Error('Title is required'));
      }
      return this.http.post(this.config.getApiEndpoint('addCategory'), {title: title});
  }
  remove(categoryId: String): Observable<null> {
      return this.http.delete(this.config.getApiEndpoint('removeCategory') + '/' + categoryId);
  }
}
