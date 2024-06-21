import { Router } from 'express';
import { getUsers, getUserById, createUser } from '../controllers';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/', createUser);

export { userRouter };
