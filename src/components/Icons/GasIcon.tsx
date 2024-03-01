import gasIcon from '../..//assets/gas.svg'

const GasIcon = ({ className }: GasIconProps) => {
  return <img src={gasIcon} alt="Gas Icon" className={`max-w-10 max-h-10 ${className}`} />
}

interface GasIconProps {
  className?: string
}

export default GasIcon
