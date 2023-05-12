export class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone: string,
    public password: string
  ){}

  static users: User[] = [
    new User("Giorgi", "Baliashvili", "giobali1998@gmail.com", "595903162", "123456")
  ];
}