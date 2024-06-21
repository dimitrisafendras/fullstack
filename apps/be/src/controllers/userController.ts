import { Request, Response, NextFunction } from 'express';
import { catchError, of, switchMap } from 'rxjs';
import { createUser$, getUserById$, getUsers$ } from '../services/userService';
import { handleObservable } from '../utils/rxUtils';

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  handleObservable(
    getUsers$(),
    res,
    next
  );
};

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  handleObservable(
    getUserById$(req.params.id),
    res,
    next
  );
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  handleObservable(
    createUser$(req.body),
    res,
    next
  );
};
