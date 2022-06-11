import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MytaskService {

  constructor(private http: HttpClient) { }

  GetMyTaskData(params: any) : any{
    return this.http.post<any>('api/Task/UserTasksAssignedToMe', params)
  }

  addTask(taskDetails : any): Observable<any> {
    return this.http.post('api/Task/AssignTask', taskDetails)
      .pipe(
        map(res => res)
      );
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.get('api/Task/DeleteTask?taskId=' + taskId)
      .pipe(
        map(res => res)
      );
  }

  getTaskDetails(taskId: number): Observable<any> {
    return this.http.get('api/Task/UserTaskDetails?taskId=' + taskId)
      .pipe(
        map(res => res)
      );
  }

  getCompanyMembers(from: string | number, to: string | number, text: string): Observable<any> {
    return this.http.get('api/CompanyMembers?from=' + from + '&text=' + text + '&to=' + to)
      .pipe(
        map(res => res)
      );
  }

  getCustomerList(params : any): Observable<any> {
    return this.http.post('api/CRM/Leads', params)
      .pipe(map(
        res => res
      ))
  }

}
