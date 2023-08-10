interface User {
  id: string;
  name: string;
  room: string;
}

const users: User[] = [];

// Add a user to all the users
const addUser = (newUser: User) => {
  let { id, name, room } = newUser;

  // remove all white spaces and make lower case
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // validation
  const existingUser = users.find(
    (user) => user.room === room && user.name == name
  );
  if (!name || !room) return { err: "name and room are required" };
  if (existingUser) return { err: `name "${existingUser.name}" already taken` };

  // add user to users array
  const user: User = { id, name, room };
  users.push(user);

  return { user };
};

// Remove first user with given id
const removeUser = (id: string) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

// Get first user with given id
const getUser = (id: string) => users.find((user) => user.id === id);

// Get an array of all the users in the given room
const getUsersInRoom = (room: string) =>
  users.filter((user) => user.room === room);

export { addUser, getUser, getUsersInRoom, removeUser };
export type { User };
