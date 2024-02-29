import electricIcon from '../..//assets/electricity.svg'

const ElectricIcon = ({ className }: ElectricIconProps) => {
  return <img src={electricIcon} alt="Electricity Icon" className={`m-w-14 m-h-14 ${className}`} />
}

interface ElectricIconProps {
  className?: string
}

export default ElectricIcon
