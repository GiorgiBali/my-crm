export class Task {
  constructor(
    public date: string,
    public task: string,
    public contactId: number,
    public time: string,
    public status: string
  ){}

  static tasks: Task[] = [];
}