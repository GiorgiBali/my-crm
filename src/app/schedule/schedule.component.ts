import { Component, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Contact } from '../shared/contact';
import { Task } from '../shared/task';
import { FirestoreService } from '../shared/firestore.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {
  selectedDate!: Date; displayedColumns = ['task', 'contact', 'time', 'options']; displayedTasks: Task[] = [];
  updatedTaskId!: string; updatedTask!: string; updatedDate!: string; updatedTime!: string;

  constructor(@Inject(LOCALE_ID) public locale: string, private firestoreService: FirestoreService){}

  onDateSelection(){
    const formattedSelectedDate: string = formatDate(this.selectedDate, 'yyyy-MM-dd', this.locale); this.displayedTasks = [];
    this.firestoreService.allTasks.forEach((task: Task) => { if (task.date === formattedSelectedDate){ this.displayedTasks.push(task); }});
  }

  updateTask(task: Task){
    this.updatedTaskId = task.FSid; this.updatedTask = task.task; this.updatedDate = task.date; this.updatedTime = task.time;
  }

  onUpdateTaskSubmit(updateTaskForm: NgForm){
    this.firestoreService.updateTaskInFS(this.updatedTaskId, this.updatedTask, this.updatedDate, this.updatedTime);
    this.firestoreService.allTasks.forEach((task: Task) => {
      if (task.FSid === this.updatedTaskId) { task.task = this.updatedTask; task.date = this.updatedDate; task.time = this.updatedTime; }
    });
    this.onDateSelection();
  }

  deleteTask(task: Task){
    this.firestoreService.deleteTaskFromFS(task.FSid);
    this.displayedTasks = this.displayedTasks.filter((tsk: Task) => { return tsk.FSid !== task.FSid });
    this.firestoreService.allTasks = this.firestoreService.allTasks.filter((tsk: Task) => { return tsk.FSid !== task.FSid });
  }
}