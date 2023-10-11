import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './models/signup/signup.component';
import { AppComponent } from './app.component';
import { HtmlEditorComponent } from './components/html-editor/html-editor.component';
import { PreviewComponent } from './components/previewdesktop/preview/preview.component';
import { HomeComponent } from './components/home/home.component';
import { CodeComponent } from './components/previewdesktop/code/code.component';

const routes: Routes = [
  {path:'',component:HomeComponent,children:[
    {path:'preview',pathMatch:'full',component:PreviewComponent},
    {path:'code',component:CodeComponent}
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
