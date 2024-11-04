export const errorsMessage = {
  errorEmail: 'Email erroneo',
  emailNoReg: 'Usuario no existe',
  passwordLengthError: 'Contraseña longitud erronea',
  passwordError: 'Contraseña erronea',
  passwordNoEqual: 'Contraseñas con coinciden'
}

const isValidLengthPassword = (password) => {
  return password.length > 4 ? true : false
}

const isValidRepassword = (password1, password2) => {
  return password1 === password2 ? true : false
}

const isValidEmail = (email) => {
  const emailRegex = /^([^\s@]+)@([^\s@]+\.[^\s@]+(\.[^\s@]+)*)$/
  return emailRegex.test(email)
}

export const emailValidation = (email) => {
  if (!isValidEmail(email)) return errorsMessage.errorEmail
  return false
}

export const passwordLengthValidation = (password) => {
  if (!isValidLengthPassword(password)) return errorsMessage.passwordLengthError

  return false
}

export const twinsPassword = (pas1, pas2) => {
  if (!isValidRepassword(pas1, pas2)) return errorsMessage.passwordNoEqual

  return false
}
