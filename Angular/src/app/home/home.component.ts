import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { BugService } from '../shared/bug.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  userDetails;
  bugDetails;
  bugs;

  constructor(private router: Router, private userService: UserService, private bugService: BugService) { }

  ngOnInit() {
    // get user details
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
      },
      err => {
        console.log(err);
      }
    );

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

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

}
