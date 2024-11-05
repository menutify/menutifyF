function TextInput({ data, setData, name = 'name', pattern = '' }) {
  return (
    <input
      name={name}
      type='text'
      placeholder='name and lastname'
      pattern={pattern}
      value={data}
      onChange={(e) => setData(e)}
      required
      minLength={4}
      maxLength={50}
    />
  )
}

export default TextInput
