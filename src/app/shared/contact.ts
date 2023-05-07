export class Contact {
  constructor (
		public checked: boolean,
		public firstName: string,
		public lastName: string,
		public email: string,
		public phone: string,
		public status: string,
		public date: string
	) {}

	static contacts: Contact[] = [
		new Contact(false, "Gojo", "Satoru", "Gojo@gmail.com", "1111111111", "Newcomer", "2022-02-06"), new Contact(false, "Itachi", "Uchiha", "Itachi@gmail.com", "22222222222", "Lead", "2018-01-06"),
		new Contact(false, "Levi", "Ackermann", "Levi@gmail.com", "3333333333", "Lead", "2021-03-05"), new Contact(false, "Shisui", "Uchiha", "Shisui@gmail.com", "4444444444", "Lead", "2017-02-06"),
		new Contact(false, "Sasuke", "Uchiha", "Sasuke@gmail.com", "5555555555", "Lead", "2013-04-06"), new Contact(false, "Kakashi", "Hatake", "Kakashi@gmail.com", "66666666666", "Lead", "2016-03-06")
	];
	static searchedContacts: Contact[] = [];
	static searchMode: boolean = false;
}