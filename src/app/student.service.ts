import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http,Response } from '@angular/http';
import { Observable,of,throwError,pipe } from 'rxjs';
import { map,filter,catchError,mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  //public apiUrl="http://localhost:56914/api/Students";
  public apiUrl="https://ng7crudapibydotnettechy.azurewebsites.net/api/Students";

  constructor(private httpClint:HttpClient) { }

  insertStudent(stu:any)
  {
    return this.httpClint.post(this.apiUrl,stu)
    .pipe(
      map(res=>res),
      catchError(this.errorHandler)
    );
  }
  getAllStudents()
  {
    return this.httpClint.get(this.apiUrl)
    .pipe(
      map(res=>res),
      catchError(this.errorHandler)
    );
  }
  updateStudent(id:number,stu:any)
  {
    return this.httpClint.put(this.apiUrl+"/"+id,stu)
    .pipe(
      map(res=>res),
      catchError(this.errorHandler)
    );
  }
  deleteStudent(id:number)
  {
    return this.httpClint.delete(this.apiUrl+"/"+id)
    .pipe(
      map(res=>res),
      catchError(this.errorHandler)
    );
  }

  errorHandler(error:Response)
  {
    console.log(error);
    return throwError(error);
    
  }

}
