import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './models/login/login.component';
import { SignupComponent } from './models/signup/signup.component';
import { AuthService } from './services/auth.service';
import { User } from 'firebase/auth';
import { ProjectsModelComponent } from './models/projects-model/projects-model.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  {
  
}

