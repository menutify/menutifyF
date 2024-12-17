function Title2({ children = '', className = '' }) {
  return <h2 className={`text-base md:text-xl lg:text-3xl ${className}`}>{children}</h2>
}

export default Title2
