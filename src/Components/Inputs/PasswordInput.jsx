function Password({ data, setData, name = 'password' }) {
  return (
    <input
      name={name}
      type='password'
      placeholder='Contraseña'
      value={data}
      onChange={(e) => setData(e)}
      required
      minLength={4}
    />
  )
}

export default Password
