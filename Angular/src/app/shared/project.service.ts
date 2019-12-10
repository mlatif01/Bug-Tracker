import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from './project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  showSelect = true;
  showEditSelect = false;
  EditStatus;

  formData: Project;
  bugList: Project[];

  readonly BaseURI = 'http://localhost:3000/api';

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  getProjects() {
    return this.http.get(this.BaseURI + '/project');
  }

  postProject(formData: FormBuilder) {
    return this.http.post(this.BaseURI + '/project', formData);
  }

  putProject(formData: Project) {
    return this.http.put(this.BaseURI + '/project/' + formData.Id, formData);
  }

  deleteProject(id: number) {
    return this.http.delete(this.BaseURI + '/project/' + id);
  }


}
