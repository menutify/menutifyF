function ImgContainer({
  className = '',
  imgClassName = '',
  src = '*',
  alt = ''
}) {
  return (
    <picture className={`overflow flex-complete ${className}`}>
      <img className={`w-full h-full  ${imgClassName}`} src={src} alt={alt} />
    </picture>
  )
}

export default ImgContainer
