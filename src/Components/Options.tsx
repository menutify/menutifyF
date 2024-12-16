function Options({ id='', value='', text=''}) {
  return (
    <option id={id} value={value}>
      {text}
    </option>
  )
}

export default Options
