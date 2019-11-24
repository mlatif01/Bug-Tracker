import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BugService {

  readonly BaseURI = 'http://localhost:3000/api';

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  getBugDetails() {
    return this.http.get(this.BaseURI + '/BugDetails');
  }

  getBugs() {
    return this.http.get(this.BaseURI + '/bug');
  }

}
