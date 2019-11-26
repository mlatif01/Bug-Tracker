import { Component, OnInit } from '@angular/core';
import { BugService } from 'src/app/shared/bug.service';
import { Bug } from 'src/app/shared/bug.model';
import { BugEntryComponent } from '../bug-entry/bug-entry.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'bug-list',
  templateUrl: './bug-list.component.html'
})
export class BugListComponent implements OnInit {

  pageTitle = 'Bug List';
  userDetails;
  bugs;

  constructor(public bugService: BugService, private toastrService: ToastrService) { }

  ngOnInit() {
    // get bug details
    this.bugService.getBugs().subscribe(res => this.bugs = res);
  }

  populateForm(bug: Bug) {
    this.bugService.formData.Title = bug.title;
    this.bugService.formData.Description = bug.description;
    this.bugService.formData.Id = bug.id;
    this.bugService.showEditSelect = true;
    console.log(this.bugService.formData);
  }

  onDelete(id: number) {
    if (confirm('Are you sure you wish to delete this record?')) {
      this.bugService.deleteBug(id).subscribe(
        res => {
          this.bugService.getBugs();
          this.toastrService.warning('Deleted Successfully', 'Bug Tracker');
        },
        err => {
          console.log(err);
        });
    }

  }

}
