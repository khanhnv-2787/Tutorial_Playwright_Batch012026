interface IUser {
	name: string;
	email: string;
	isAdmin?: boolean;
}

class User implements IUser {
	name: string;
	email: string;
	isAdmin: boolean;

	constructor(name: string, email: string, isAdmin: boolean = false) {
		this.name = name;
		this.email = email;
		this.isAdmin = isAdmin;
	}

	getInfo(): string {
		return `User: ${this.name}, Email: ${this.email}, Admin: ${this.isAdmin}`;
	}
}

class AdminUser extends User {
	constructor(name: string, email: string) {
		super(name, email, true);
	}

	deleteUser(user: User): string {
		return `User ${user.name} has been deleted`;
	}
}

const admin = new AdminUser("Khanh", "nguyen.van.khanh-c@sun-asterisk.com");

const users: User[] = [
	new User("A", "A@example.com"),
	new User("B", "B@example.com"),
	admin,
];

users.forEach((u) => {
	console.log(u.getInfo());
});
