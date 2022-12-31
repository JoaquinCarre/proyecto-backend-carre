import bcrypt from 'bcrypt'

export const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password)
}

export const encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}