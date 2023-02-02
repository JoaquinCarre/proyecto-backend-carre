import { userDB } from "../db/index.js";
import { logger } from "../logs/logger.js";

async function getUser(id) {
  try {
    return await userDB.getByid(id);
  } catch (err) {
    logger.error("No es posible obtener el usuario ", err);
  }
}

async function addNewUser(user) {
  try {
    await userDB.create(user);
  } catch (err) {
    logger.error("No es posible registrar el usuario ", err);
  }
}

async function getUsers() {
  try {
    return await userDB.getAll();
  } catch (err) {
    logger.error(
      "No es posible obtener la lista de usuarios registrados ",
      err
    );
  }
}

async function uploadUser(id, data) {
  try {
    await userDB.updateById(id, data);
  } catch (err) {
    logger.error("No es posible actualizar el usuario ", err);
  }
}

async function deleteUser(id) {
  try {
    await userDB.deleteById(id);
  } catch (err) {
    logger.error("No es posible borra el usuario ", err);
  }
}

export default {
  getUser,
  addNewUser,
  getUsers,
  uploadUser,
  deleteUser
};
