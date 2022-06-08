import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MytaskService {

  constructor(private http: HttpClient) { }

  GetMyTeskData() {
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
    return this.http.post('api/Task/UserTasksAssignedToMe', params).pipe(map(res=>{
      console.log(res);
    }))
  }
}
