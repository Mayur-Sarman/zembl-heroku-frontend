import { Typography, Tooltip } from '@material-tailwind/react'
import { ELECTRICITY_VALUE, GAS_VALUE } from '../../constants'

const ControllerTooltip = ({ tooltipText, isCurrentUsage, currentUsageType }: ControllerTooltipProps) => {
    return (
        <Tooltip
     placement="bottom"
     className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10 inline-block"
     content={
       <div className="w-80">
        { !isCurrentUsage ?
          <Typography
          variant="small"
          color="blue-gray"
          className="font-normal opacity-80"
        >
          {tooltipText}
        </Typography> :
        currentUsageType === ELECTRICITY_VALUE ?
        <>
          <Typography variant="small" color="blue-gray" className="font-normal opacity-80 underline">Low-energy user</Typography>
          <Typography variant="small" color="blue-gray" className="font-normal opacity-80">
            The average electricity usage in this group is 2,000kWh electricity per 90 days
          </Typography>
          <br/>
          <Typography variant="small" color="blue-gray" className="font-normal opacity-80 underline">Medium-energy user</Typography>
          <Typography variant="small" color="blue-gray" className="font-normal opacity-80">
          The average electricity usage in this group is 8,000kWh electricity per 90 days
          </Typography>
          <br/>
          <Typography variant="small" color="blue-gray" className="font-normal opacity-80 underline">High-energy user</Typography>
          <Typography variant="small" color="blue-gray" className="font-normal opacity-80">
          The average electricity usage in this group is 20,000kWh electricity per 90 days
          </Typography>
        </>
         :
        currentUsageType === GAS_VALUE ?
        <>
          <Typography variant="small" color="blue-gray" className="font-normal opacity-80 underline">Low-energy user</Typography>
          <Typography variant="small" color="blue-gray" className="font-normal opacity-80">
          The average gas usage in this group is 30,000kWh electricity per 90 days
          </Typography>
          <br/>
          <Typography variant="small" color="blue-gray" className="font-normal opacity-80 underline">Medium-energy user</Typography>
          <Typography variant="small" color="blue-gray" className="font-normal opacity-80">
          The average gas usage in this group is 57,000kWh electricity per 90 days
          </Typography>
          <br/>
          <Typography variant="small" color="blue-gray" className="font-normal opacity-80 underline">High-energy user</Typography>
          <Typography variant="small" color="blue-gray" className="font-normal opacity-80">
          The average gas usage in this group is 80,000kWh electricity per 90 days.
          </Typography>
        </> : null
        }
         
       </div>
     }
   >
     <svg
       xmlns="http://www.w3.org/2000/svg"
       fill="none"
       viewBox="0 0 24 24"
       stroke="currentColor"
       strokeWidth={2}
       className="h-3 w-3 cursor-pointer text-blue-gray-500 inline-block"
     >
       <path
         strokeLinecap="round"
         strokeLinejoin="round"
         d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
       />
     </svg>
   </Tooltip>
    )
  }
  
  interface ControllerTooltipProps {
    tooltipText?: string
    isCurrentUsage?: boolean
    currentUsageType?: string
  }
  
  export default ControllerTooltip