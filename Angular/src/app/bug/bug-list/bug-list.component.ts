import { Component, OnInit } from '@angular/core';
import { BugService } from 'src/app/shared/bug.service';

@Component({
  selector: 'bug-list',
  templateUrl: './bug-list.component.html'
})
export class BugListComponent implements OnInit {

  pageTitle: string = 'Bug List';
  userDetails;
  bugs;

  constructor(private bugService: BugService) { }

  ngOnInit() {
    // get bug details
    this.bugService.getBugDetails().subscribe(
      res => {
        this.userDetails = res;
      },
      err => {
        console.log(err);
      }
    );

    this.bugService.getBugs().subscribe(res => this.bugs = res);
  }



}
