import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { AngularFittextModule } from 'angular-fittext';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgStringPipesModule } from 'angular-pipes';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
// routing
import { AppRoutingModule } from './app-routing.module';
// components
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DialogEditTaskComponent } from './components/dialog-edit-task/dialog-edit-task.component';
// services
import { ValidateService } from './services/validate.service';
import { TasklistService } from './services/tasklist.service';
import { CommonService } from './services/common.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DialogEditTaskComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    AngularFittextModule,
    InfiniteScrollModule,
    NgStringPipesModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule
  ],
  entryComponents: [DialogEditTaskComponent],
  providers: [
    ValidateService,
    TasklistService,
    CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
