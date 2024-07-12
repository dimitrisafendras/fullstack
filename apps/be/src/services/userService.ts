import { of, switchMap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models';
import { client } from '../db';

const debug = (data) => {
  console.log('>>>', data);
  return data;
};

export const getUsers$ = () => {
  return of(null).pipe(
    debug,
    switchMap(async () => {
      const db = client.db('FullStackCluster0');
      const collection = db.collection('users');
      const users = await collection.find({}).toArray();
      console.log('users:', users);
      return users;
    }),
    debug,
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
