function EmailInput({ setData, data }) {
  return (
    <input
    name='email'
      type='email'
      placeholder='Email'
      value={data}
      onChange={(e) => setData(e)}
      required
    />
  )
}

export default EmailInput
