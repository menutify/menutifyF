function Label1({ children, className = '' }) {
  return (
    <label className={`text-sm/6 tracking-wider  ${className}`}>{children}</label>
  )
}

export default Label1
