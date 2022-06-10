import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { AddTaskComponent } from '../../../Views/my-task/add-task/add-task.component';

@Injectable({
  providedIn: 'root'
})
export class AddTaskGuard implements CanDeactivate<AddTaskComponent> {
  canDeactivate(component : AddTaskComponent) {
      if (component.addTaskForm.invalid || component.addTaskForm.dirty) {
        return window.confirm('are you sure to leave this page')
      }
      return true;
  }  
}
