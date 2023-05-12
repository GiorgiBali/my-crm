import { Component, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import { Contact } from '../shared/contact';
import { Task } from '../shared/task';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {
  selectedDate: Date = new Date(); formattedSelectedDate: string = "";
  displayedColumns = ['task', 'contactId', 'time', 'done'];
  displayedTasks: Task[] = [];

  constructor(@Inject(LOCALE_ID) public locale: string){}

  ngDoCheck(): void {
    if (Contact.taskProperties.length === 4){
      Task.tasks.push({ date: Contact.taskProperties[3], task: Contact.taskProperties[0],
        contactId: Number(Contact.taskProperties[1]), time: Contact.taskProperties[2], done: false });
      Contact.taskProperties = [];
    }

    this.displayedTasks = []; this.formattedSelectedDate = formatDate(this.selectedDate, 'yyyy-MM-dd', this.locale);
    Task.tasks.forEach((el: Task) => {
      if (el.date === this.formattedSelectedDate){ this.displayedTasks.push(el); }
    });
  }

  taskStatus(element: Task){
    element.done = true;
  }
}