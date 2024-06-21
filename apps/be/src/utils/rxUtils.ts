import { NextFunction, Response } from 'express';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const handleObservable = (observable: Observable<any>, res: Response, next: NextFunction) => {
  observable.pipe(
    catchError(err => {
      next(err);
      return [];
    })
  ).subscribe(
    data => res.json(data),
    err => next(err)
  );
};
