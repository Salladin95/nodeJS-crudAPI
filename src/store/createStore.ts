import { RandomUUIDOptions } from 'crypto';

type User = { uuid: RandomUUIDOptions | string; name: string; age: number; hobbies: string[] };
type UserActions = {
	addUser: (user: User) => void;
	getUserByID: (id: RandomUUIDOptions | string) => void;
	removeUser: (id: RandomUUIDOptions | string) => void;
	updateUser: (newUser: User) => void;
};

const createUsersStore = (): UserActions => {
	let users: User[] = [];

	return {
		addUser: (user: User) => users.push(user),
		getUserByID: (uuid: string | RandomUUIDOptions) => users.find((user) => user.uuid === uuid),
		removeUser: (uuid: RandomUUIDOptions | string): void => {
			users = users.filter((user) => user.uuid !== uuid);
		},
		updateUser: (updatedUser: User): void => {
			users = users.map((user) => {
				if (user.uuid !== updatedUser.uuid) {
					return user;
				}
				return updatedUser;
			});
		},
	};
};

export default createUsersStore;
