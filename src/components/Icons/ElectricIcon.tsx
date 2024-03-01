import electricIcon from '../..//assets/electricity.svg'

const ElectricIcon = ({ className }: ElectricIconProps) => {
  return <img src={electricIcon} alt="Electricity Icon" className={`max-w-10 max-h-10 ${className}`} />
}

interface ElectricIconProps {
  className?: string
}

export default ElectricIcon
