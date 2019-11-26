import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bug } from './bug.model';

@Injectable({
  providedIn: 'root'
})
export class BugService {

  formData: Bug;

  readonly BaseURI = 'http://localhost:3000/api';

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  getBugs() {
    return this.http.get(this.BaseURI + '/bug');
  }

  postBug(formData: FormBuilder) {
    return this.http.post(this.BaseURI + '/bug', formData);
  }

}
