import { Component, OnInit } from '@angular/core';
import { BugService } from 'src/app/shared/bug.service';
import { Bug } from 'src/app/shared/bug.model';
import { BugEntryComponent } from '../bug-entry/bug-entry.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Project } from 'src/app/shared/project.model';
import { ProjectService } from 'src/app/shared/project.service';

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html'
})
export class ProjectListComponent implements OnInit {

  pageTitle = 'Project List';
  userDetails;
  projects;

  constructor(public bugService: BugService, public projectService: ProjectService,
              private toastrService: ToastrService, private router: Router) { }

  ngOnInit() {
    // get bug details
    this.projectService.getProjects().subscribe(res => this.projects = res);
  }

  populateForm(project: Project) {
    this.projectService.formData.Title = project.title;
    this.projectService.formData.Description = project.description;
    this.projectService.formData.Id = project.id;
    this.projectService.showEditSelect = true;
    console.log(this.projectService.formData);
  }

  onDelete(id: number) {
    if (confirm('Are you sure you wish to delete this record?')) {
      this.projectService.deleteProject(id).subscribe(
        res => {
          this.projectService.getProjects();
          this.toastrService.warning('Deleted Successfully', 'Bug Tracker');
          // temporary fix
          this.router.navigateByUrl('/user/login');
        },
        err => {
          console.log(err);
        });
    }
  }

  showBugs(projectId: number) {
    this.bugService.projectId = projectId;
    this.router.navigateByUrl('/user/login');
  }

}
