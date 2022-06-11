import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import {MytaskService} from '../../../core/my-task/mytask.service'
import { ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import {MatTableDataSource} from '@angular/material/table';
import { TaskModel } from 'src/app/core/my-task/task.model';
import { LoaderService } from 'src/app/core/share/loader.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.scss']
})
export class MyTaskComponent implements OnInit{
 
  displayedColumns = ['Title','CustomerName','AssignedBy','AssignedDate','DueDate','Priority','Status','Action'];
  dataSource = new MatTableDataSource;

  params = {
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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private mytaskservice : MytaskService,
    private toastrservice : ToastrService,) { }

  ngOnInit(): void {
    this.GetMyTaskData()
  }

  GetMyTaskData(){
  
    this.mytaskservice.GetMyTaskData(this.params).subscribe((x:any) => {
    this.dataSource = x.data.TaskList;
    });
  }   

  addtask(action : string){
    this.dialog.open(AddTaskComponent, { 
      width: '700px',
    })
  }

  deleteTask(taskId : any){
    let text = "Do you want to delete this Task?"
    if(confirm(text) == true){
      this.mytaskservice.deleteTask(taskId)
      .subscribe(res=>{
        if(res){
        this.toastrservice.success("Task Deleted Succesfully");
        this.GetMyTaskData();
        }
      }); 
    }else{
      return;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.params.Title = filterValue
    this.mytaskservice.GetMyTaskData(this.params).pipe(map((x : any) =>{
      this.dataSource = x.data.TaskList;
      debounceTime(1000),
      distinctUntilChanged()
    })).subscribe();
  }
}


