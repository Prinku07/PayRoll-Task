import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { AddTaskComponent } from './add-task/add-task.component';

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.scss']
})
export class MyTaskComponent implements OnInit {

  constructor(
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addtask(){
    this.dialog.open(AddTaskComponent, { 
      width: '750px'
    })
  }
}
