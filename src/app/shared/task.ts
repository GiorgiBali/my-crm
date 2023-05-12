export class Task {
  constructor(
    public date: string,
    public task: string,
    public contactId: number,
    public time: string,
    public done: boolean
  ){}

  static tasks: Task[] = [
    {date: '2023-05-11', task: 'Call', contactId: -1, time: '10:30', done: false},
    {date: '2023-05-11', task: 'Meeting', contactId: -2, time: '11:30', done: false}
  ];
}