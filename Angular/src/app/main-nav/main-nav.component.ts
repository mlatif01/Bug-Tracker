import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { BugService } from '../shared/bug.service';
import { ProjectService } from '../shared/project.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  userDetails;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    constructor(private breakpointObserver: BreakpointObserver, private userService: UserService,
                private router: Router, public bugService: BugService, private projectService: ProjectService) {}

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
    }


  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

}
