
function Text({ children = '', className = '' }) {
  return <p className={`text-base tracking-wider ${className}`}>{children}</p>
}

export default Text
