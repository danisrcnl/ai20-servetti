import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home.component';
import { StudentsContComponent } from '../teacher/students-cont.component';
import { VmsContComponent } from '../teacher/vms-cont.component';
import { PageNotFoundComponent } from '../page-not-found.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'teacher', children: [
      { path: 'course', children: [
          { path: 'applicazioni-internet', children: [
              { path: 'students', component: StudentsContComponent },
              { path: 'vms', component: VmsContComponent }
          ] }
      ] }
  ] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }
