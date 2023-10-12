import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ClasslistComponent } from './components/classlist/classlist.component';
import { PreviewdesktopComponent } from './components/previewdesktop/previewdesktop.component';
import { PreviewmobileComponent } from './components/previewmobile/previewmobile.component';
import { NewattrComponent } from './components/newattr/newattr.component';
import { CsseditorComponent } from './components/csseditor/csseditor.component';
import { GeneratefileComponent } from './components/generatefile/generatefile.component';
import { SelectClassesComponent } from './components/select-classes/select-classes.component';
import { ProjectsModelComponent } from './models/projects-model/projects-model.component';
import { LoginComponent } from './models/login/login.component';
import {CdkDrag} from '@angular/cdk/drag-drop'
import { MatDialogModule } from '@angular/material/dialog';
import { SignupComponent } from './models/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HtmlEditorComponent } from './components/html-editor/html-editor.component';
import { PreviewComponent } from './components/previewdesktop/preview/preview.component';
import { HomeComponent } from './components/home/home.component';
import { CodeComponent } from './components/previewdesktop/code/code.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AccountComponent } from './components/account/account.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClasslistComponent,
    PreviewdesktopComponent,
    PreviewmobileComponent,
    NewattrComponent,
    CsseditorComponent,
    GeneratefileComponent,
    SelectClassesComponent,
    ProjectsModelComponent,
    LoginComponent,
    SignupComponent,
    HtmlEditorComponent,
    PreviewComponent,
    HomeComponent,
    CodeComponent,
    SpinnerComponent,
    AccountComponent,
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    CdkDrag,
    BrowserAnimationsModule
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
