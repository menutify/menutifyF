function Anchor2({ className = '', children, to = '' }) {
  return (
    <a
      href={to}
      className={` text-center text-sm/6 font-semibold tracking-wider ${className}`}
      target='_blank'
    >
      {children}
    </a>
  )
}

export default Anchor2
