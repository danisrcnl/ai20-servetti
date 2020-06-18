import { Component, OnInit, ViewChild } from '@angular/core';
import { Student } from '../student.model';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { StudentsComponent } from './students.component';
import { StudentsService } from '../service/services/students.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-students-cont',
  templateUrl: './students-cont.component.html',
  styleUrls: ['./students-cont.component.css']
})

export class StudentsContComponent implements OnInit {
  

  students: Student[] = new Array<Student>();

  studentsDb: Student[] = new Array<Student>();

  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>(this.students);

  @ViewChild(StudentsComponent)
  studentsComponent: StudentsComponent;


  constructor(private studentsService: StudentsService) { }

  ngOnInit(): void {

    this.fetchTable();

  }

  onStudentsDeleted(selected: Student[]) {
    selected.forEach(s => {
      s.courseId = 0;
      this.studentsService.update(s).subscribe( answer => {
        console.log(answer);
        this.fetchTable();        
      });
    });
  }

  onStudentAdded(student: Student) {
    if(student == null)
      return;
    this.studentsService.updateEnrolled(1, student).subscribe( answer => {
      this.fetchTable();    
    });
  }

  private fetchTable() {
    this.studentsService.query().subscribe(receivedStudents => {
      console.log(receivedStudents);
      this.students = new Array();
      this.studentsDb = new Array();
      receivedStudents.forEach(s => {
        if(s.courseId == 0) this.studentsDb.push(s);
        else this.students.push(s);
      });
      this.studentsComponent.updateFilteredOptions();
      this.studentsComponent.selection.clear();
      this.studentsComponent.selectedOption = null;
      this.dataSource = new MatTableDataSource<Student>(this.students);
      this.studentsComponent.dataSource.paginator = this.studentsComponent.paginator;
    });
  }  
}
