

export default function CocoLineArrow({
  stroke = "#FFFFFF",
  className="",
  size = "w-6 h-6",
}: { size?: string, className?: string, stroke?: string, fill?: string }) {
  return (
    <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} ${size}`}>
      <path d="M9.5 7L14.5 12L9.5 17" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}