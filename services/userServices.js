import { userInstance } from "../models/dao/indexDAO.js";
import { logger } from "../logs/logger.js";

export async function getUser(id) {
  try {
    return await userInstance.getOneById(id);
  } catch (err) {
    logger.error("No es posible obtener el usuario ", err);
  }
}

export async function addNewUser(user) {
  try {
    await userInstance.create(user);
  } catch (err) {
    logger.error("No es posible registrar el usuario ", err);
  }
}

export async function getUsers() {
  try {
    return await userInstance.getAll();
  } catch (err) {
    logger.error(
      "No es posible obtener la lista de usuarios registrados ",
      err
    );
  }
}

export async function uploadUser(id, data) {
  try {
    await userInstance.updateById(id, data);
  } catch (err) {
    logger.error("No es posible actualizar el usuario ", err);
  }
}

export async function deleteUser(id) {
  try {
    await userInstance.deleteById(id);
  } catch (err) {
    logger.error("No es posible borra el usuario ", err);
  }
}
