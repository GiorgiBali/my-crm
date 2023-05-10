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
  displayedColumns = ['task', 'contactId', 'time', 'status'];
  displayedTasks: Task[] = [];

  constructor(@Inject(LOCALE_ID) public locale: string){}

  ngDoCheck(): void {
    if (Contact.taskProperties.length === 4){
      Task.tasks.push({ date: Contact.taskProperties[3], task: Contact.taskProperties[0],
        contactId: Number(Contact.taskProperties[1]), time: Contact.taskProperties[2], status: 'Pending' });
      Contact.taskProperties = [];
    }
    this.displayedTasks = []; this.formattedSelectedDate = formatDate(this.selectedDate, 'yyyy-MM-dd', this.locale);
    Task.tasks.forEach((el: Task) => {
      if (el.date === this.formattedSelectedDate){ this.displayedTasks.push(el); }
    });
  }
}

// export interface Element { date: string, task: string; contactId: number; time: string; status: string }
// let ELEMENT_DATA: Element[] = [
  // {date: '2023-05-10', task: 'Call', contactId: 0, time: '10:30', status: 'Pending'},
  // {date: '2023-05-10', task: 'Email', contactId: 0, time: '11:30', status: 'Completed'},
  // {date: '2023-05-10', task: 'Meeting', contactId: 0, time: '12:30', status: 'Pending'}
// ];