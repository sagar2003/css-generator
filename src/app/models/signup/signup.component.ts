import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { FormBuilder, Validators } from '@angular/forms';
import { NewUser } from './newuser';
import { ConfirmPassValidator } from './confirmpass.validator';
import { PassPatternValidator } from './passpattern.validator';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  constructor(private dialog:MatDialog,private fb:FormBuilder,private signupdialogref:MatDialogRef<SignupComponent>,private auth:AuthService){}

  ngOnInit(): void {
  }


  handleLogin(){
    this.signupdialogref.close({next:'login'})
  }

  signUpForm = this.fb.group({
    name:['',Validators.required],
    passSecurity:this.fb.group({
      pass:['',[Validators.required,PassPatternValidator]],
      repass:['',[Validators.required]],
    },{validators:ConfirmPassValidator}),
    userContact:this.fb.group({
      email:['',Validators.required],
      contact:[,Validators.required]
    })
  })

  handleSubmit() {
    const newUser = new NewUser(
      this.signUpForm.get('name')?.value!,
      this.signUpForm.get('userContact')?.value['email']!,
      this.signUpForm.get('passSecurity')?.value['pass']!,
      this.signUpForm.get('userContact')?.value['contact']!,
    );
    this.auth.signUp(newUser).subscribe({
      next:(data)=>{
        console.log(this.signupdialogref)
        this.signupdialogref.close({next:'authenticated'})
      },error:(err)=>{
        alert(err)
        console.log(err);
      }
    })
  }

}
