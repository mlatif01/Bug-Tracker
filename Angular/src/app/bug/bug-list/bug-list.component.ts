import { Component, OnInit } from '@angular/core';
import { BugService } from 'src/app/shared/bug.service';

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



}
