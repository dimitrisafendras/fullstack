import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
];

export const getUsers$ = () => {
  return of(users).pipe(delay(1000));
};

export const getUserById$ = (id: string) => {
  return of(users.find(user => user.id === parseInt(id, 10))).pipe(delay(1000));
};

export const createUser$ = (user: any) => {
  const newUser = { id: users.length + 1, ...user };
  users.push(newUser);
  return of(newUser).pipe(delay(1000));
};
