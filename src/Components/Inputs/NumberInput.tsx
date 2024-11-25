function TextInput({ data, setData, name = 'name', pattern = '' }) {
  return (
    <input
      name={name}
      type='number'
      placeholder='Phone number'
      pattern={pattern}
      value={data}
      onChange={(e) => setData(e)}
      required
      minLength={4}
      maxLength={50}
      autoComplete='off'
    />
  )
}

export default TextInput
