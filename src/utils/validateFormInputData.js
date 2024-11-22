const errorsMessage = {
  errorEmail: 'Email erroneo',
  emailNoReg: 'Usuario no existe',
  passwordLengthError: 'Contraseña longitud erronea',
  passwordError: 'Contraseña erronea',
  passwordNoEqual: 'Contraseñas con coinciden',
  nameHaveOtherCharacters: 'El nombre solo puede contener letras',
  nameFailed: 'El nombre solo debe contener letras',
  phoneError: 'Debe ser un telefono valido'
}

//deben ser emails
const emailValidation = (email) => {
  const resp = /^([^\s@]+)@([^\s@]+\.[^\s@]+(\.[^\s@]+)*)$/.test(email)
  if (!resp) return errorsMessage.errorEmail
  return false
}

//deben tener mas de 5 caracteres
const passwordLengthValidation = (password) => {
  if (password.length > 5 === false) return errorsMessage.passwordLengthError
  return false
}

//deben coincidir las contraseñas
const twinsPassword = (password1, password2) => {
  if (password1 !== password2) return errorsMessage.passwordNoEqual
  return false
}

const nameValidation = (name) => {
  if (!/^[A-Za-z\s]+$/.test(name)) return errorsMessage.nameFailed
  return name.length > 4 ? false : 'El nombre debe ser mas largo'
}

const codePhoneValidation = (code) => {
  return code.length > 5 || code.length < 2
    ? 'Codigo de telefono erroneo'
    : false
}

const PhoneValidation = (phone) => {
  return !phone.length > 15 || /^[0-9]*$/.test(phone)
    ? false
    : errorsMessage.phoneError
}

const validations = {
  email: (e) => emailValidation(e.email),
  password: (e) => passwordLengthValidation(e.password),
  name: (e) => nameValidation(e.name),
  code: (e) => codePhoneValidation(e.code),
  phone: (e) => PhoneValidation(e.phone),repassword: (e) => twinsPassword(e.password, e.repassword)
}

/**
 *
 * @param {object} data de tipo object
 * @returns
 * - (string): si existe algun error ❌
 * - (false): si no hay errores ✅
 */
function validateInputData(data) {
  for (const key of Object.keys(data)) {
    if (validations[key]) {
      const resp = validations[key](data)
      if (resp) return resp
    } else {
      console.log('no existe la key en inputvalidation: ' + key)
    }
  }

  return false
}

export default validateInputData
