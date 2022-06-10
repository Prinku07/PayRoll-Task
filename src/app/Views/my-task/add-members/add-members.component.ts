import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs';
import { MytaskService } from 'src/app/core/my-task/mytask.service';

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.scss']
})
export class AddMembersComponent implements OnInit {

  memberList: any = [];
  viewLoading: boolean = false;
  totalRecords: number = 0;
  noRecords: boolean = false;
  userIds: any = [];
  previousFromRow: number = 0;
  previousToRow: number = 0;
  lastRowIndex: number = 0;
  showRemoveUser: boolean = false;
  removeUserDetails: any;
  removeUserList: any = [];
  addRemove: boolean = false;

  constructor(
    private taskService: MytaskService,
    public dialogRef: MatDialogRef<AddMembersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {dialogRef.disableClose = true; }

  ngOnInit() {

   console.log(this.data)

    if (this.data.usersData != '' && this.data.usersData != undefined) {
      this.showRemoveUser = true;
      this.getMembersList(1, 100, '');
      this.removeUserDetails = this.data.usersData;
    } else if (this.data.usersIds != [] && this.data.usersIds != undefined) {
      this.addRemove = true;
      this.getMembersList(1, 100, '');
      this.previousFromRow = 1;
      this.previousToRow = 10;
    }
    else {
      this.getMembersList(1, 10, '');
      this.previousFromRow = 1;
      this.previousToRow = 10;
    }
  }

  getMembersList(from: number, to: number, text: string) {
    this.taskService.getCompanyMembers(from, to, text)
      .pipe(
        map((members : any) => {
          Array.prototype.push.apply(this.memberList, members.data.Members);
          this.totalRecords = members.data.TotalRecords;
          this.lastRowIndex = this.memberList.length;
          this.viewLoading = false;
          this.getChecked();
        })
      ).subscribe();
  }

  onscroll(event : any) {
    if (this.previousFromRow < this.totalRecords && this.previousToRow < this.totalRecords) {
      let pos = event.target.scrollTop + event.target.offsetHeight;
      let max = event.target.scrollHeight;
      if (pos >= max) {
        if (this.lastRowIndex + 10 < this.totalRecords || this.lastRowIndex + 10 == this.totalRecords) {
          this.getMembersList(this.previousFromRow + 10, this.previousToRow + 10, '');
          this.previousFromRow += 10;
          this.previousToRow += 10;
        }
        return;
      }
      return;
    }
  }

  searchMember(searchValue : any) {
    this.viewLoading = true;
    this.taskService.getCompanyMembers(1, this.totalRecords, searchValue)
      .pipe(
        map((members: any) => {
          this.memberList = members.data.Members;
          if (this.memberList == undefined) {
            this.noRecords = true
          }
          else {
            this.noRecords = false;
          }
        })
      ).subscribe();
    this.viewLoading = false;
  }

  checkedMember(event: any, userId: number, memberName: any) {
    if (event.checked) {
        const params = {
          UserId: userId,
          Name: memberName
        }
        this.userIds.push(params);
    }
    else {
        let index: number = 0;
        for (let i = 0; i < this.userIds.length; i++) {
          index = this.userIds.findIndex((x: any)=> x.UserId == userId);
        }
        this.userIds.splice(index, 1);     
    }
  }

  onSubmit() {
      const members = this.userIds;
      this.dialogRef.close({ members, isEdit: true })
    }

  getChecked() {
    this.userIds = [];
    let param;
   
      this.data.usersIds.forEach((element : any) => {
        for (let i = 0; i < this.memberList.length; i++) {
          if (element == this.memberList[i].UserId) {
            param = {
              UserId: element,
              Name: this.memberList[i].Name
            }
            this.userIds.push(param);
          }
        }
      });

      if (this.data.usersIds != '' && this.data.usersIds != undefined) {
        for (let i = 0; i < this.memberList.length; i++) {
          for (let j = 0; j < this.data.usersIds.length; j++) {
            if (this.memberList[i].UserId == this.data.usersIds[j]) {
              Object.assign(this.memberList[i], { isChecked: true })
            }
          }
        }
      }
    
      if (this.data.usersIds != '' && this.data.usersIds != undefined) {
        this.userIds = this.data.usersIds;
        for (let i = 0; i < this.memberList.length; i++) {
          for (let j = 0; j < this.data.usersIds.length; j++) {
            if (this.memberList[i].UserId == this.data.usersIds[j].UserId) {
              Object.assign(this.memberList[i], { isChecked: true })
            }
          }
        }
      }
  }
  

  onNoClick() {
    this.dialogRef.close();
  }


}
