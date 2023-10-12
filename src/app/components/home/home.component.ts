import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/models/login/login.component';
import { ProjectsModelComponent } from 'src/app/models/projects-model/projects-model.component';
import { SignupComponent } from 'src/app/models/signup/signup.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'CssGen';
  cuserUid:string|undefined;

  constructor(private dialog: MatDialog, private auth: AuthService,private router:Router) {}

  openLogin() {
    const dialogref = this.dialog.open(LoginComponent, {
      height: 'fit-content',
      width: '450px',
    });

    dialogref.disableClose = true;

    const sublogin = dialogref.afterClosed().subscribe((next) => {
      sublogin.unsubscribe();
      if (next && next.next == 'signup') {
        this.openSignUp();
      }else if(next && next.next=='authenticated'){
        this.cuserUid=this.auth.cuser?.uid;
      }
    });
  }

  openSignUp() {
    const signupdialogref = this.dialog.open(SignupComponent, {
      height: 'fit-content',
      width: '450px',
    });

    signupdialogref.disableClose = true;

    const subsignup = signupdialogref.afterClosed().subscribe((data) => {
      subsignup.unsubscribe();
      if (data && data.next == 'login') {
        this.openLogin();
      }else if(data && data.next=='authenticated'){
        this.cuserUid=this.auth.cuser?.uid;
      }
    });
  }

  openProjectDialog(userId:string){
    const projectDialogRef = this.dialog.open(ProjectsModelComponent,{
      height: 'fit-content',
      width: '450px',
      data:{
        uid:userId
      }
    })

    projectDialogRef.disableClose=true;

    projectDialogRef.afterClosed().subscribe({
      next:(data)=>{
        this.router.navigate(['preview'])
      },error:(err)=>{
        console.log(err)
      }
    })
  }

  checkAuth() {
    this.auth.authChange.subscribe((user) => {
      if (!user) {
        this.openLogin();
      }else{
        this.openProjectDialog(user.uid)
      }
    });
  }

  ngOnInit(): void {
    this.checkAuth();
  }

  currentClass:string|undefined;

  updateAttribute(key:string){
    this.currentClass=key;
  }
}
