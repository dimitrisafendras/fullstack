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
    switchMap(async () => {
      const db = client.db('sample_mflix');
      const collection = db.collection('users');
      return await collection.find({}).toArray();
    }),
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
