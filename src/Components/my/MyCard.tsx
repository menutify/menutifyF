function MyCard({ children=[<></>], className = '' }) {
  return (
    <div className={`${className} flex gap-[20px] flex-col w-full `}>
      {children}
    </div>
  )
}

export default MyCard
