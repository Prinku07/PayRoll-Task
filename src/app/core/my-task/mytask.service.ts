import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MytaskService {

  constructor(private http: HttpClient) { }

  GetMyTaskData() : Observable<any>{
    const params = {
      From: 1,
      FromDueDate: "",
      IsArchive: false,
      Priority: "",
      SortByDueDate: "",
      SortColumn: "",
      SortOrder: "",
      TaskStatus: "",
      Title: "",
      To: 10,
      ToDueDate: "",
      UserId: 1,
      UserIds: ""
    }
    return this.http.post<any>('api/Task/UserTasksAssignedToMe', params)
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

  removeUsersExistingTask(taskId: any, taskOwners: any): Observable<any> {
    const params = {
      Id: taskId,
      UserIds: taskOwners
    }
    return this.http.post('api/Task/RemoveUsersFromExistingTask', params)
      .pipe(
        map(res => res)
      );
  }

  removeOwnerTask(taskId: any, taskOwners: any): Observable<any> {
    const params = {
      Id: taskId,
      TaskOwners: taskOwners,
    }
    return this.http.post('api/Task/RemoveOwnersFromExistingTask', params)
      .pipe(
        map(res => res)
      );
  }

}
