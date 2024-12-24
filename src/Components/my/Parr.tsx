function Parr({ children = '', className = '' }) {
  return (
    <p className={`text-lg text-parr_color_1 leading-6 ${className}`}>
      {children}
    </p>
  )
}

export default Parr
