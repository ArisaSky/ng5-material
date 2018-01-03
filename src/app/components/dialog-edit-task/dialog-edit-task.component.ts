import { Component, OnInit, Inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import {
  MatSnackBar,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
// services
import { CommonService } from '../../services/common.service';
import { TasklistService } from '../../services/tasklist.service';

@Component({
  selector: 'app-dialog-edit-task',
  templateUrl: './dialog-edit-task.component.html',
  styleUrls: ['./dialog-edit-task.component.scss']
})
export class DialogEditTaskComponent implements OnInit {
  form: FormGroup;

  constructor(
    private cs: CommonService,
    private ts: TasklistService,
    private fb: FormBuilder,
    private msb: MatSnackBar,
    private mdr: MatDialogRef<DialogEditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = fb.group({
      "title": [this.data.title, [Validators.required]],
      "details": [this.data.details, [Validators.required]]
    });
  }

  ngOnInit() { }

  // form field getters
  get title() { return this.form.get('title') }
  get details() { return this.form.get('details') }

  onCancel() {
    this.mdr.close();
  }

  onUpdate() {
    if(!this.form.valid)
    {
      this.msb.open("Please check fields marked in red.", 'Got it!', this.cs.snackbarWarnConfig);
      return;
    }

    const params = {
      title: this.title.value.trim(),
      details: this.details.value.trim()
    }

    this.ts.editTasklist(this.data._id, params).subscribe(res => {
      this.msb.open("Task successfully edited.", 'Got it!', this.cs.snackbarPrimaryConfig);
      res["i"] = this.data.i;
      this.cs.socket.emit('edit-tasklist', res);
      this.mdr.close();
    }, (err) => {
      console.log(err);
      this.msb.open("Failed to edit task.", 'Got it!', this.cs.snackbarWarnConfig);
    });
  }
}
