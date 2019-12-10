import { Component, OnInit } from '@angular/core';
import { BugService } from 'src/app/shared/bug.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/shared/project.service';

@Component({
  selector: 'project-entry',
  templateUrl: './project-entry.component.html',
  styles: []
})
export class ProjectEntryComponent implements OnInit {

  constructor(public projectService: ProjectService, private toastrService: ToastrService, private router: Router ) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.projectService.formData = {
      Id: 0,
      Title: '',
      Description: '',
    };
    form.reset({Status: 'New'});
  }

  onSubmit(form: NgForm) {
    console.log(form.value)
    if (form.value.Id == 0) {
      this.insertRecord(form);
    } else {
      this.updateRecord(form);
    }
    this.projectService.showEditSelect = false;
  }

  updateRecord(form: NgForm) {
    console.log("EDIT");
    this.projectService.putProject(form.value).subscribe(
      res => {
        this.toastrService.info('Edited Successfully', 'Project List');
        this.resetForm(form);
        // temporary fix
        this.router.navigateByUrl('/user/login');
      },
      err => {
        console.log(err);
      }
    );
  }

  insertRecord(form: NgForm) {
    console.log("POST");
    this.projectService.postProject(form.value).subscribe(
      res => {
        this.toastrService.success('Inserted Successfully', 'Project List');
        this.resetForm(form);
        this.projectService.getProjects();
        // temporary fix
        this.router.navigateByUrl('/user/login');
      },
      err => {
        console.log(err);
      }
    );
  }

}
