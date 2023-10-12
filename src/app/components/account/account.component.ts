import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit{

  constructor(private authService:AuthService,private dialogRef:MatDialogRef<any>){}

  userData:{name:string,email:string}={name:'',email:''}

  ngOnInit(): void {
    this.userData=this.authService.userData;
    this.authService.userDataChanged.subscribe((data)=>{
      this.userData=data;
    })
  }

  logOut(){
    this.authService.logout().then((data)=>{
      this.dialogRef.close();
    }).catch((err)=>{
      alert(err);
    })
  }
  
}
