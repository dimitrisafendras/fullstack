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
      try {
        console.log('Fetching users...');
        const db = client.db('sample_mflix');
        console.log('Connected to database:', db.databaseName);
        const collection = db.collection('users');
        console.log('Accessing collection:', collection.collectionName);

        // Debug: Check the count of documents in the collection
        const count = await collection.countDocuments();
        console.log('Number of documents in the collection:', count);

        const users = await collection.find({}).toArray();
        console.log('users:', users);
        return users;
      } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
      }
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
