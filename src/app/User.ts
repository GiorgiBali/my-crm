export class User {
    constructor (
        public firstName: string,
        public lastName: string,
        public email: string,
        public phone: string
    ) {}

    static users: User[] = [];
    static searchedUsers: User[] = [];
    static query: string = "";
}