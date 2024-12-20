function Title({ children = '', className = '' }) {
  return <h2 className={`text-2xl font-bold ${className}`}>{children}</h2>
}

export default Title
