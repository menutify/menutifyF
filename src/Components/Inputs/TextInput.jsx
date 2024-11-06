function TextInput({
  data,
  setData,
  name = 'name',
  placeholder = 'text'
}) {
  return (
    <input
      name={name}
      type='text'
      placeholder={placeholder}
      
      value={data}
      onChange={(e) => setData(e)}
      required
      minLength={4}
      maxLength={50}
    />
  )
}

export default TextInput
