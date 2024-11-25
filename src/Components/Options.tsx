function Options({ id, value, text, emoji = '' }) {
  return (
    <option id={id} value={value} emoji={emoji}>
      {text}
    </option>
  )
}

export default Options
