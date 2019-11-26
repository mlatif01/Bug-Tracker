import { Component, OnInit } from '@angular/core';
import { BugService } from 'src/app/shared/bug.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'bug-entry',
  templateUrl: './bug-entry.component.html',
  styles: []
})
export class BugEntryComponent implements OnInit {

  constructor(public bugService: BugService, private toastrService: ToastrService ) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.bugService.formData = {
      Id: null,
      Title: '',
      Description: '',
      Status: 'New'
    };
    form.reset({Status: 'New'});
  }

  onSubmit(form: NgForm) {
    if (form.value.Id == null) {
      this.insertRecord(form);
    } else {
      this.updateRecord(form);
    }
    this.bugService.showEditSelect = false;
  }

  updateRecord(form: NgForm) {
    this.bugService.putBug(form.value).subscribe(
      res => {
        this.toastrService.success('Edited Successfully', 'Bug Tracker');
        this.resetForm(form);
      },
      err => {
        console.log(err);
      }
    );
  }

  insertRecord(form: NgForm) {
    this.bugService.postBug(form.value).subscribe(
      res => {
        this.toastrService.success('Inserted Successfully', 'Bug Tracker');
        this.resetForm(form);
        this.bugService.getBugs();
      },
      err => {
        console.log(err);
      }
    );
  }

}
