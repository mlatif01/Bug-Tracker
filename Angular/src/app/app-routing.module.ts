import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { BugListComponent } from './bug/bug-list/bug-list.component';
import { BugEntryComponent } from './bug/bug-entry/bug-entry.component';
import { ProjectListComponent } from './bug/project-list/project-list.component';
import { ProjectEntryComponent } from './bug/project-entry/project-entry.component';


const routes: Routes = [
  {path: '', redirectTo: '/user/login', pathMatch: 'full'},
  {path: 'user', component: UserComponent,
  children: [
      {path: 'registration', component: RegistrationComponent},
      {path: 'login', component: LoginComponent}
    ]
  },
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard],
  // Might be wrong?
    children: [
      {path: 'project-list', component: ProjectListComponent},
      {path: 'project-entry', component: ProjectEntryComponent},
    ]
  },
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard],
  // Might be wrong?
    children: [
      {path: 'bug-list', component: BugListComponent},
      {path: 'bug-entry', component: BugEntryComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
