import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';
import { SignupComponent } from 'src/app/models/signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private fb:FormBuilder,public dialogRef: MatDialogRef<LoginComponent>,private dialog:MatDialog,private auth:AuthService){}


  loginform = this.fb.group({
    email:[null,[Validators.email,Validators.required]],
    pass:[null,[Validators.required]],
  })

  handleSignUp(){
    this.dialogRef.close({next:'signup'})
  }

  handleSubmit() {
    const email = this.loginform.get('email')?.value
    const pass = this.loginform.get('pass')?.value
    if (email && pass) {
      this.auth.login(email,pass).subscribe({
        next:(data)=>{
          this.dialogRef.close({next:'authenticated'})
        },error:(err)=>{
          alert(err)
          console.log(err)
        }
      })
    }
  }

}
