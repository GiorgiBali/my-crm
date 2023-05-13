export class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone: string,
    public password: string
  ){}

  static users: User[] = [
    new User("Levi", "Ackermann", "Levi@gmail.com", "1111111111", "123456"),
    new User("Gojo", "Satoru", "Gojo@gmail.com", "2222222222", "123456")
  ];
  static loggedUser: User = User.users[0];
}