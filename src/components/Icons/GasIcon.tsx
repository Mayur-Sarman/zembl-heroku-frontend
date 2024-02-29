import gasIcon from '../..//assets/gas.svg'

const GasIcon = ({ className }: GasIconProps) => {
  return <img src={gasIcon} alt="Gas Icon" className={`m-w-14 m-h-14 ${className}`} />
}

interface GasIconProps {
  className?: string
}

export default GasIcon
