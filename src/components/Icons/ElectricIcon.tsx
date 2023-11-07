import electricIcon from '../..//assets/electricity.svg'

const ElectricIcon = ({ className }: ElectricIconProps) => {
  return <img src={electricIcon} alt="Electricity Icon" className={`w-14 h-14 ${className}`} />
}

interface ElectricIconProps {
  className?: string
}

export default ElectricIcon
