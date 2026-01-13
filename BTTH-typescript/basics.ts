interface IUser {
	name: string;
	age: number;
	isActive: boolean;
	roles: string[];
	email: string;
}

const username: string = "Khanh";

const age: number = 27;

const isActive: boolean = true;

const roles: string[] = ["dev", "auto-test"];

export const user: IUser = {
	name: username,
	age,
	isActive,
	roles,
	email: "nguyen.van.khanh-c@sun-asterisk.com",
};

const printUserInfo = (user: IUser): void => {
	console.log(
		`IUser: ${user.name} (email: ${user.email}), Roles: ${user.roles.join(
			", "
		)}, Active: ${user.isActive}`
	);
};

const checkAdult = (user: IUser): void => {
	console.log(user.age >= 18 ? "Adult" : "Under 18");
};

printUserInfo(user);
checkAdult(user);
