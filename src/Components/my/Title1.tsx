function Title1({ children = '', className = '' }) {
  return (
    <h2 className={`text-2xl/9 font-bold tracking-wider  ${className}`}>
      {children}
    </h2>
  )
}

export default Title1
