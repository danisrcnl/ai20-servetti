import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { Student } from '../student.model';
import { MatCheckbox } from '@angular/material/checkbox';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Output, EventEmitter } from '@angular/core';

const initialSelection = [];
const allowMultiSelect = true;


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})

export class StudentsComponent implements OnInit {

  
  private _students: Student[]; 

    public get students(): Student[] {
      return this._students;
    }

    @Input('enrolledStudents')
    public set students(value: Student[]) {
      this._students = value;
    }

  
  private _studentsDb: Student[];

    public get studentsDb(): Student[] {
      return this._studentsDb;
    }

    @Input('notEnrolledStudents')
    public set studentsDb(value: Student[]) {
      this._studentsDb = value;
    }

  
  private _dataSource: MatTableDataSource<Student>;

    public get dataSource(): MatTableDataSource<Student> {
      return this._dataSource;
    }

    @Input('dataSource')
    public set dataSource(value: MatTableDataSource<Student>) {
      this._dataSource = value;
    }

  @Output()
  studentAdded: EventEmitter<Student> = new EventEmitter<Student>();

  @Output('studentsDeleted')
  studentsDeleted: EventEmitter<Student[]> = new EventEmitter<Student[]>();

  filteredOptions: Observable<Student[]>;

  colsToDisplay: string[] = ['select', 'id', 'firstName', 'name', 'group'];

  selection = new SelectionModel<Student>(allowMultiSelect, initialSelection);

  myControl = new FormControl();

  studentToBeAdded: Student = null;

  selectedOption: Student = null;

  @ViewChild(MatPaginator, { static: true }) 
  paginator: MatPaginator;

  @ViewChild(MatCheckbox)
  checkbox: MatCheckbox;


  constructor() { }


  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : this.displayFn(value)),
      map(displayedValue => this._filter(displayedValue))
    );
    this.dataSource.paginator = this.paginator;
  }

  onCheckboxSelected(event: Event, row: Student) {
    this.selection.toggle(row);
  }

  onMainCheckboxSelected(event: Event) {
    this.isAllSelected() ? this.selection.clear() : this.getPageData().forEach(row => this.selection.select(row));
  }

  isAllSelected() {
    return this.getPageData().every((row) => this.selection.isSelected(row));
  }

  deleteSelected() {
    this.studentsDeleted.emit(this.selection.selected);
  }

  updateFilteredOptions() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : this.displayFn(value)),
      map(displayedValue => this._filter(displayedValue))
    );
  }

  getPageData() {
    return this.dataSource._pageData(this.dataSource._orderData(this.dataSource.filteredData));
  }

  displayFn(student: Student): string {
    return student && student.id ? student.firstName + " " + student.name + " " + student.id : '';
  }

  addStudent() {
    this.studentAdded.emit(this.selectedOption);
  }

  private _filter(value: string): Student[] {
    const filterValue = value.toLowerCase();
    return this.studentsDb.filter(student => this.displayFn(student).toLowerCase().includes(filterValue));
  }

  /* SORT */

  sortData(sort: Sort) {
    let newStudents: Student[] = this.students.slice();
    let newDataSource: MatTableDataSource<Student>;
    if (!sort.active || sort.direction === '') {
      this.students = newStudents;
      return;
    }

    this.students = newStudents.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return compare(a.id, b.id, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        case 'firstName': return compare(a.firstName, b.firstName, isAsc);
        case 'group': return compare(a.group, b.group, isAsc);
        default: return 0;
      }
    });
    newDataSource = new MatTableDataSource<Student>(newStudents);
    this.dataSource = newDataSource;
    this.dataSource.paginator = this.paginator;
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

