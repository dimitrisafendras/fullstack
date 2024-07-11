import { Request, Response, NextFunction } from 'express';
import { createUser$, getUserById$, getUsers$ } from '../services/userService';
import { handleObservable } from '../utils';

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Returns a list of all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  handleObservable(getUsers$(), res, next);
};

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  handleObservable(getUserById$(req.params.id), res, next);
};

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created
 */
export const createUser = (req: Request, res: Response, next: NextFunction) => {
  handleObservable(createUser$(req.body), res, next);
};
