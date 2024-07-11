import { of, switchMap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models';

export const getUsers$ = () => {
  return of(null).pipe(
    switchMap(() => User.find({})),
    catchError((error) => of({ error: error.message }))
  );
};

export const getUserById$ = (id: string) => {
  return of(id).pipe(
    switchMap((userId) => User.findById(userId)),
    catchError((error) => of({ error: error.message }))
  );
};

export const createUser$ = (user: any) => {
  return of(user).pipe(
    switchMap((userData) => User.create(userData)),
    catchError((error) => of({ error: error.message }))
  );
};
