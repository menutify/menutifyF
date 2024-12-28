import { Link } from 'react-router-dom'

function Anchor1({ className = '', children, to = '', style = {} }) {
  return (
    <Link
      className={` text-center text-sm/6 font-semibold tracking-wider decoration-inherit  ${className}`}
      to={to}
      style={{ ...style }}
    >
      {children}
    </Link>
  )
}

export default Anchor1
