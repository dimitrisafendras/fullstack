import { NextFunction, Response, RequestHandler } from 'express';
import { Observable, EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export const handleObservable = (
  observable: Observable<any>,
  res: Response,
  next: NextFunction
): void => {
  observable
    .pipe(
      tap((data) => res.json(data)),
      catchError((err) => {
        next(err);
        return EMPTY;
      })
    )
    .subscribe({
      error: (err) => next(err),
    });
};
