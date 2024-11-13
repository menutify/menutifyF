export const errorsMessage = {
  errorEmail: 'Email erroneo',
  emailNoReg: 'Usuario no existe',
  passwordLengthError: 'Contraseña longitud erronea',
  passwordError: 'Contraseña erronea',
  passwordNoEqual: 'Contraseñas con coinciden'
}


//deben ser emails
export const emailValidation = (email) => {
  const resp = /^([^\s@]+)@([^\s@]+\.[^\s@]+(\.[^\s@]+)*)$/.test(email)
  if (!resp) return errorsMessage.errorEmail
  return false
}

//deben tener mas de 5 caracteres
export const passwordLengthValidation = (password) => {
  if (password.length > 5 === false) return errorsMessage.passwordLengthError
  return false
}

//deben coincidir las contraseñas
export const twinsPassword = (password1, password2) => {
  if (password1 !== password2) return errorsMessage.passwordNoEqual
  return false
}
