import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import {
    trigger,
    style,
    transition,
    animate,
    keyframes,
    query,
    stagger
} from '@angular/animations';
import {
  MatSnackBar,
  MatDialog
} from '@angular/material';
// services
import { ValidateService } from '../../services/validate.service';
import { TasklistService } from '../../services/tasklist.service';
import { CommonService } from '../../services/common.service';
// components
import { DialogEditTaskComponent } from '../../components/dialog-edit-task/dialog-edit-task.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('tasklistAnimation', [
      transition('* => *', [
        query(':enter', style({opacity: 0}), {optional: true}),
        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)', offset: 1.0}),
          ]))
        ]), {optional: true}),
        query(':leave', stagger('300ms', [
          animate('.6s ease-out', keyframes([
            style({opacity: 1, transform: 'translateY(0)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset: 0.3}),
            style({opacity: 0, transform: 'translateY(-75%)', offset: 1.0}),
          ]))
        ]), {optional: true})
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  tasklist: any;
  interval: any;
  tasklistcount: number = 0;
  skip: number = 0;
  limit: number = 6;
  isloading: boolean = false;

  constructor(
    private vs: ValidateService,
    private ts: TasklistService,
    private cs: CommonService,
    private fb: FormBuilder,
    private msb: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.form = fb.group({
      "title": ['', [Validators.required]],
      "details": ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.getTasklist(this.skip, this.limit);
    this.skip = this.limit + 1;
    // sockets
    // add
    this.cs.socket.on('new-tasklist', (res) => {
      this.tasklist.push(res);
      this.ts.refreshTasklist(this.tasklist);
      this.tasklistcount = this.tasklist.length;
    });
    // update
    this.cs.socket.on('update-tasklist', (res) => {
      this.tasklist[res.i].title = res.title;
      this.tasklist[res.i].details = res.details;
      this.ts.refreshTasklist(this.tasklist);
      this.tasklistcount = this.tasklist.length;
    });
    // delete
    this.cs.socket.on('remove-tasklist', (res) => {
      this.tasklist.splice(res.i, 1);
      this.ts.refreshTasklist(this.tasklist);
      this.tasklistcount = this.tasklist.length;
    });
  }

  // form field getters
  get title() { return this.form.get('title') }
  get details() { return this.form.get('details') }

  getTasklist(skip, limit) {
    this.ts.getTasklist(skip, limit).subscribe(res => {
      this.tasklist = res;
      this.ts.refreshTasklist(this.tasklist);
      this.tasklistcount = this.tasklist.length;
    });
  }

  submitTask() {
    const params = {
      title: this.title.value.trim(),
      details: this.details.value.trim()
    }

    // validate injection
    if(!this.vs.validateTasklist(params)) {
      this.msb.open('Some of the fields don\'t have values.', 'Got it!', this.cs.snackbarWarnConfig);
      return false;
    }

    // insert task
    this.ts.addTasklist(params).subscribe(res => {
      this.msb.open("Task successfully added.", 'Got it!', this.cs.snackbarPrimaryConfig);
      this.form.reset();
      this.cs.socket.emit('save-tasklist', res);
    }, (err) => {
      console.log(err);
      this.msb.open("Failed to add task.", 'Got it!', this.cs.snackbarWarnConfig);
    });
  }

  editTask(i) {
    let data = this.tasklist[i];
    data["i"] = i;
    let dialogRef = this.dialog.open(DialogEditTaskComponent, {
      minWidth: '300px',
      data: data
    });
  }

  deleteTask(i) {
    this.ts.deleteTasklist(this.tasklist[i]._id).subscribe(res => {
      this.msb.open("Task successfully deleted.", 'Got it!', this.cs.snackbarPrimaryConfig);
      res["i"] = i;
      this.cs.socket.emit('delete-tasklist', res);
    }, (err) => {
      console.log(err);
      this.msb.open("Failed to delete task.", 'Got it!', this.cs.snackbarWarnConfig);
    });
  }

  onScroll() {
    this.isloading = true;
    console.log(this.skip);
    this.ts.getTasklist(this.skip, 5).subscribe(res => {
      if(res.length > 0)
      {
        for(let i = 0; i < res.length; i++)
        {
          console.log(res[i]);
          this.tasklist.push(res[i]);
          this.ts.refreshTasklist(this.tasklist);
          this.tasklistcount = this.tasklist.length;
        }
      }

      this.isloading = false;
    });
    this.skip += 5;
  }
}
