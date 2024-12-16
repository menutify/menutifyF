function MyCard({ children=[<></>], className = '' }) {
  return (
    <div className={`${className} flex gap-my_gap_1 flex-col w-full `}>
      {children}
    </div>
  )
}

export default MyCard
