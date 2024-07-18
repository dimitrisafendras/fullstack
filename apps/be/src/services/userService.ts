import { of, switchMap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models';

export const getUsers$ = () => {
  return of(null).pipe(
    switchMap(async () => {
      try {
        const users = await User.find({});
        return users;
      } catch (error) {
        throw new Error(error.message);
      }
    }),
    catchError((error) => of({ error: error.message }))
  );
};

export const getUserById$ = (id: string) => {
  return of(id).pipe(
    switchMap(async (userId) => {
      try {
        const user = await User.findById(userId);
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      } catch (error) {
        throw new Error(error.message);
      }
    }),
    catchError((error) => of({ error: error.message }))
  );
};

export const createUser$ = (user: any) => {
  return of(user).pipe(
    switchMap(async (userData) => {
      try {
        const newUser = new User(userData);
        await newUser.save();
        return newUser;
      } catch (error) {
        throw new Error(error.message);
      }
    }),
    catchError((error) => of({ error: error.message }))
  );
};
