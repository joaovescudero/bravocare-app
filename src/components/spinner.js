import React from 'react'
import { TailSpin } from 'react-loader-spinner'

const Spinner = ({
  width = 70,
  height = 70,
}) => {
  return (
    <div className="flex justify-center w-full">
      <TailSpin
        height={width}
        width={height}
        color="#9CA3AF"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  )
}

export default Spinner