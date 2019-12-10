import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bug } from './bug.model';

@Injectable({
  providedIn: 'root'
})
export class BugService {

  showSelect = true;
  showEditSelect = false;
  EditStatus;
  projectId;

  formData: Bug;
  bugList: Bug[];

  readonly BaseURI = 'http://localhost:3000/api';

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  getBugs(projectId: number) {
    return this.http.get(this.BaseURI + '/bug/' + projectId);
  }

  postBug(formData: Bug, projectId: number) {
    formData.ProjectId = projectId;
    return this.http.post(this.BaseURI + '/bug', formData);
  }

  putBug(formData: Bug) {
    return this.http.put(this.BaseURI + '/bug/' + formData.Id, formData);
  }

  deleteBug(id: number) {
    return this.http.delete(this.BaseURI + '/bug/' + id);
  }


}
