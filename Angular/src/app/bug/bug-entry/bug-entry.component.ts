import { Component, OnInit } from '@angular/core';
import { BugService } from 'src/app/shared/bug.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'bug-entry',
  templateUrl: './bug-entry.component.html',
  styles: []
})
export class BugEntryComponent implements OnInit {

  constructor(public bugService: BugService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.bugService.formData = {
      Title: '',
      Description: ''
    };
  }

  onSubmit(form: NgForm) {
    this.insertRecord(form);
  }

  insertRecord(form: NgForm) {
    console.log(form.value);
    this.bugService.postBug(form.value).subscribe(
      res => {
        this.resetForm(form);
      },
      err => {
        console.log(err);
      }
    );
  }

}
