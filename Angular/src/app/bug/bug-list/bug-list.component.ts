import { Component, OnInit } from '@angular/core';
import { BugService } from 'src/app/shared/bug.service';

@Component({
  selector: 'bug-list',
  templateUrl: './bug-list.component.html'
})
export class BugListComponent implements OnInit {

  pageTitle = 'Bug List';

  constructor(private bugService: BugService) { }

  ngOnInit() {
    // get bug list
    this.bugService.getBugs();
  }



}
