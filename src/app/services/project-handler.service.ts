import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import {
  onValue,
  ref,
  set,
} from 'firebase/database';
import { User } from '@firebase/auth';
import { uploadString,ref as storageRef, getDownloadURL} from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class ProjectHandlerService  {


  constructor(private authService:AuthService) { 
    this.authService.authChange.subscribe((user) => {
      this.cuser=user;      
    });
  }


  database=this.authService.database;
  storage = this.authService.storage;
  jsondata:any|undefined;
  keyProject:string|undefined;
  projectname='';

  cuser:User = this.authService.cuser!;
  projectDataChange:EventEmitter<any> = new EventEmitter();
  projectData:any;

  classesToAplly:EventEmitter<any> = new EventEmitter();

  setClasses(data:string){
    return set(ref(this.database,this.cuser?.uid+'/projects/'+this.keyProject+'/classes/'),data);
  }

  getClasses(key:string){
    this.keyProject=key;
    return new Observable((observ)=>{
      const projectsRef = ref(this.database, this.cuser?.uid + '/projects/'+key+"/")
      
    
      onValue(projectsRef, (snapshot) => {
        const data = snapshot.child('classes').val();
        this.projectname=snapshot.child('name').val()
        if(data){
          this.projectData=data;
          this.projectDataChange.emit(data)
          observ.next(data);
        }else{
          observ.error('No data found')
        }
      });
    })
  }


  addClass(name:string){
    return set(ref(this.database,  this.cuser?.uid + '/projects/'+this.keyProject+"/classes/"+name), 'null' );     
  }

  addAttribute(classname:string,attributename:string,val:string){
    return set(ref(this.database,  this.cuser?.uid + '/projects/'+this.keyProject+"/classes/"+classname+"/"+attributename), val );     
  }

  removeAttr(cla:string,key:string){
    return set(ref(this.database,this.cuser.uid+"/projects/"+this.keyProject+"/classes/"+cla+"/"+key),null);
  }

  saveProject(htmlContent:string,cssContent:string){
    return new Observable((observ)=>{
      uploadString(storageRef(this.storage,this.cuser.uid+'/projects/'+this.keyProject+'/htmlFile'),htmlContent).then(()=>{
        uploadString(storageRef(this.storage,this.cuser.uid+'/projects/'+this.keyProject+'/cssFile'),cssContent).then(()=>{
          observ.next()
        }).catch((err)=>{
          observ.error("failed to upload css error:"+err)
        })
      }).catch((err)=>{
        observ.error("failed to upload html error:"+err)
      })
    })
  }

  loadProjectFiles(key:string){
    return new Observable<string>((observ)=>{
      getDownloadURL(storageRef(this.storage,this.cuser.uid+'/projects/'+key+'/htmlFile')).then((url)=>{
        fetch(url).then((data)=>{
          data.text().then((data)=>{
            observ.next(data)
          }).catch((err)=>{
            observ.error('no content Error: '+err)
          });
        }).catch((err)=>{
          observ.error('url invalid Error: '+err);
        })
      }).catch((err)=>{
        observ.error('no files Error: '+err)
      })
    })
    
  }


  downloadProject(){
    var urlsOfFiles:{htmlUrl:string,cssUrl:string} = {htmlUrl:'',cssUrl:''} 
    var blobOfFiles:{htmlBlob:Blob,cssBlob:Blob}={htmlBlob:new Blob(),cssBlob:new Blob()};
    return new Observable<{htmlBlob:Blob,cssBlob:Blob}>((observ)=>{
      getDownloadURL(storageRef(this.storage,this.cuser.uid+'/projects/'+this.keyProject+'/htmlFile')).then((url)=>{
        urlsOfFiles.htmlUrl=url;
        getDownloadURL(storageRef(this.storage,this.cuser.uid+'/projects/'+this.keyProject+'/cssFile')).then((url)=>{
          urlsOfFiles.cssUrl=url;
          fetch(urlsOfFiles.htmlUrl).then((res)=>res.blob()).then((res)=>{
            blobOfFiles.htmlBlob=res;
            fetch(urlsOfFiles.cssUrl).then((res)=>res.blob()).then((res)=>{
              blobOfFiles.cssBlob=res;
              observ.next(blobOfFiles);
            })
          })
        }).catch((err)=>{
          observ.error(err)
        })
      }).catch((err)=>{
        observ.error(err)
      })
    })
  }
  
}
