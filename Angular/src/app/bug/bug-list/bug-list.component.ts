import { Component, OnInit } from '@angular/core';
import { BugService } from 'src/app/shared/bug.service';
import { Bug } from 'src/app/shared/bug.model';
import { BugEntryComponent } from '../bug-entry/bug-entry.component';

@Component({
  selector: 'bug-list',
  templateUrl: './bug-list.component.html'
})
export class BugListComponent implements OnInit {

  pageTitle = 'Bug List';
  userDetails;
  bugs;

  constructor(public bugService: BugService) { }

  ngOnInit() {
    // get bug details
    this.bugService.getBugs().subscribe(res => this.bugs = res);
  }

  populateForm(bug: Bug) {
    console.log(bug);
    console.log(bug.id);
    this.bugService.formData.Title = bug.title;
    this.bugService.formData.Description = bug.description;
    this.bugService.formData.Id = bug.id;
    this.bugService.showEditSelect = true;
  }


}
