import { NgModule } from '@angular/core';
import {
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule,
  MatChipsModule,
  MatDialogModule,
  MatProgressSpinnerModule
} from '@angular/material';

const MAT_MODULES = [
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule,
  MatChipsModule,
  MatDialogModule,
  MatProgressSpinnerModule
];

@NgModule({
  declarations: [],
  imports: MAT_MODULES,
  exports: MAT_MODULES
})
export class MaterialModule { }