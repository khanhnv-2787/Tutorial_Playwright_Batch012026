import { user } from "./basics";

function sum(a: number, b: number): number {
	return a + b;
}

const multiply = (a: number, b: number): number => {
	return a * b;
};

function greet(name: string, role: string = "guest"): void {
	console.log(`Hello ${name}, your role is ${role}.`);
}

greet(user.name, user.roles[0]);

const delayPrint = async (
	message: string,
	delaySeconds: number
): Promise<void> => {
	const waitingPromise = new Promise<void>((resolve) => {
		setTimeout(() => {
			resolve();
		}, delaySeconds * 1000);
	});

	await waitingPromise;
	console.log(message);
};

delayPrint("This message is printed after 3 seconds", 3);
