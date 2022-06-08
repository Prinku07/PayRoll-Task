import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddTaskComponent } from './add-task/add-task.component';
import {MytaskService} from '../../core/services/mytask.service'

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.scss']
})
export class MyTaskComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private mytaskservice : MytaskService) { }

  ngOnInit(): void {
    this.GetMyTeskData()
  }

  GetMyTeskData(){
    console.log("sevice called")
    this.mytaskservice.GetMyTeskData().subscribe();
  }

  addtask(){
    this.dialog.open(AddTaskComponent, { 
      width: '750px'
    })
  }
}
