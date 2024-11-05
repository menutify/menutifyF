function ButtonSubmit({ isPending = false, text = 'Submit' }) {
  return (
    <button
      disabled={isPending}
      style={!isPending ? {} : { color: '#4448', cursor: 'default' }}
    >
      {text}
    </button>
  )
}

export default ButtonSubmit
