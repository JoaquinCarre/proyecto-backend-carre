import { logger } from '../logs/logger.js';
import {
  getUser,
  addNewUser,
  getUsers,
  uploadUser,
  deleteUser
} from '../services/userServices.js';

export async function getAuthUser(req, res, next) {
  try {
    const user = await getUser(req.user._id);
    res.json(user);
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
}

export async function registerUser(req, res, next) {
  try {
    const { body } = req;
    const user = await addNewUser(body);
    res.json(user);
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
}

export async function getAllUsers(_, res, next) {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
}

export async function getUser(req, res, next) {
  try {
    const { params: { id } } = req
    const user = await getUser(id)
    if (!user) {
      return res.status(404).end()
    }
    res.json(user)
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
}

export async function updateUser(req, res, next) {
  try {
    const { params: { id }, body } = req
    const { modifiedCount, matchedCount } = uploadUser(id, body)
    if (!modifiedCount || !matchedCount) {
      return res.status(404).end()
    }
    res.status(204).end()
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const { params: { id } } = req
    const { deletedCount } = deleteUser(id)
    if (!deletedCount) {
      return res.status(404).end()
    }
    res.status(204).end()
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
}

