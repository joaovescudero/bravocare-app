import cn from 'classname'
import { format } from 'date-fns'

import { parseDateTime } from '../utils/date'

const Card = ({
  onClick,
  selected,
  data,
}) => {
  const startTime = format(parseDateTime(data.shift_date, data.start_time), 'h:mm a')
  const endTime = format(parseDateTime(data.shift_date, data.end_time), 'h:mm a')

  return (
    <div
      className={
        cn("flex flex-col justify-center content-center text-center rounded border-2 border-gray-400 w-[30%] pt-3 pb-3 cursor-pointer", {
          "bg-blue-500": selected,
          "text-white": selected,
        })
      }
      onClick={() => onClick(data.shift_id)}
    >
      <span>{data.facility.facility_name}</span>
      <span>{data.shift_date}</span>
      <span>{startTime} - {endTime}</span>
    </div>
  )
}

export default Card