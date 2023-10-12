import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { FirebaseApp, getApp, initializeApp } from 'firebase/app';
import { projectsArray } from '../models/projects-model/iprojects';
import { FirebaseStorage, getStorage } from 'firebase/storage'
import {
  Auth,
  User,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  Database,
  DatabaseReference,
  getDatabase,
  onValue,
  ref,
  set,
} from 'firebase/database';
import { Observable } from 'rxjs';
import { NewUser } from '../models/signup/newuser';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  firebaseConfig = {
    apiKey: 'AIzaSyDJBwbkjNSaWynH--6UkpDEgUK3a3COIYw',
    authDomain: 'css-generator-e85f6.firebaseapp.com',
    projectId: 'css-generator-e85f6',
    storageBucket: 'css-generator-e85f6.appspot.com',
    messagingSenderId: '921126506193',
    appId: '1:921126506193:web:b3b2ad861370b699b43ff0',
    measurementId: 'G-RNCTHCLSYB',
  };

  auth: Auth;
  app: FirebaseApp;
  database: Database;
  storage: FirebaseStorage
  cuser: User | undefined;
  userData:{name:string,email:string}={name:'',email:''}
  
  userDataChanged:EventEmitter<{name:string,email:string}> = new EventEmitter();
  authChange: EventEmitter<User> = new EventEmitter();

  constructor() {
    this.app = initializeApp(this.firebaseConfig);
    this.auth = getAuth(this.app);
    this.database = getDatabase();
    this.storage = getStorage(this.app);
  

    this.auth.onAuthStateChanged(() => {
      this.cuser = this.auth.currentUser!;
      this.authChange.emit(this.cuser);
    });
  }
  ngOnInit(): void {}

  signUp(user: NewUser) {
    return new Observable((observ) => {
      createUserWithEmailAndPassword(this.auth, user.email, user.pass)
        .then((userCredential) => {
          this.cuser = this.auth.currentUser!;
          set(ref(this.database, this.auth.currentUser?.uid), {
            name: user.name,
            contact: user.contact,
            email: user.email,
          })
            .then((res) => {
              observ.next();
            })
            .catch((err) => {
              console.log(err);
              observ.error('failed to update user ' + err);
            });
        })
        .catch((err) => {
          console.log(err);
          observ.error('failed to signup ' + err);
        });
    });
  }

  login(email: string, pass: string) {
    return new Observable((observ) => {
      signInWithEmailAndPassword(this.auth, email, pass)
        .then((data) => {
          observ.next(data);
        })
        .catch((err) => {
          console.log(err);
          observ.error(err);
        });
    });
  }

  logout(){
    return signOut(this.auth)
  }

  getProjects() {
    return new Observable<projectsArray>((observ)=>{
      
      const projectsRef = ref(this.database, this.cuser?.uid)

      onValue(projectsRef, (snapshot) => {        
        this.userData = {name:snapshot.child('name').val(),email:snapshot.child('email').val()}
        this.userDataChanged.emit(this.userData)
        const data = snapshot.child('projects').val();
        if(data){
          observ.next(data);
        }else{
          observ.error('No data found')
        }
      });
    })
  }


  createNewProject(projectName:string,uidproject:string){
    return set(ref(this.database, this.cuser?.uid+'/projects/'+uidproject.toString()), {
      name: projectName
    });
  }
  
}




