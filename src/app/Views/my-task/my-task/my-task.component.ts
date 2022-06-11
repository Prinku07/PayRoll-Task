import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { MytaskService } from '../../../core/my-task/mytask.service'
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { LoaderService } from 'src/app/core/share/loader.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.scss']
})
export class MyTaskComponent implements OnInit {

  displayedColumns = ['Title', 'CustomerName', 'AssignedBy', 'AssignedDate', 'DueDate', 'Priority', 'Status', 'Action'];
  data: any;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private mytaskservice: MytaskService,
    private toastrservice: ToastrService,) { }

  ngOnInit(): void {
    this.GetMyTaskData()
  }

  GetMyTaskData() {
    let params = {
      From: 1,
      Title: "",
      To: -1,
      UserId : "",
    }
    this.mytaskservice.GetMyTaskData(params).subscribe((x: any) => {
      this.data = new MatTableDataSource<any>(x.data.TaskList);
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;
    });
  }

  addtask() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '700px',
    })
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
      let params = {
        From: 1,
        Title: "",
        To: -1,
        UserId : 102,
      }
      this.mytaskservice.GetMyTaskData(params).subscribe();
      this.toastrservice.success("Task Added Succesfully");
    });

  }

  deleteTask(taskId: any) {
    let text = "Do you want to delete this Task?"
    if (confirm(text) == true) {
      this.mytaskservice.deleteTask(taskId)
        .subscribe(res => {
          if (res) {
            this.toastrservice.success("Task Deleted Succesfully");
            this.GetMyTaskData();
          }
        });
    } else {
      return;
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase()
   // this.params.Title = filterValue
    // this.mytaskservice.GetMyTaskData(this.params).pipe(
    //   debounceTime(1000),
    //   distinctUntilChanged()
    // ).subscribe((x: any) => {
    //   this.data = new MatTableDataSource<any>(x.data.TaskList);
    // });
    if (this.data.paginator) {
      this.data.paginator.firstPage();
    }
  }
}


