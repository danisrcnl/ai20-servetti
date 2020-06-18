import { Injectable } from '@angular/core';
import { Student } from '../../student.model';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'/*,
    'Authorization': 'my-auth-token'*/
  })
};


@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private students: Student[] = [
  ];

  private studentsUrl: string = "http://localhost:3000/students";

  constructor(private http: HttpClient) { }

  public create(s: Student): Observable<Student> {
    return this.http.post<Student>(this.studentsUrl, s, httpOptions);
  }

  public update(s: Student): Observable<Student> {
    return this.http.put<Student>(this.studentsUrl + "/" + s.id, s, httpOptions);
  }

  public find(id: string): Observable<Student> {
    return this.http.get<Student>(this.studentsUrl + "/" + id);
  }

  public query(): Observable<Student[]> { return this.http.get<Student[]>(this.studentsUrl); }

  public delete(s: Student): Observable<{}> {
    return this.http.delete(this.studentsUrl + "/" + s.id, httpOptions);
  }

  public updateEnrolled(courseId: number, s: Student): Observable<Student> {
    s.courseId = courseId;
    return this.update(s);
  }

  public getEnrolled(courseId: number): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsUrl)
  }

}
