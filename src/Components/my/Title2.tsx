function Title2({ children = '', className = '' }) {
  return (
    <h3
      className={`text-xl/9 font-medium tracking-wider leading-tight ${className}`}
    >
      {children}
    </h3>
  )
}

export default Title2
