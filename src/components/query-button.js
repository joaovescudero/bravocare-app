import React from 'react'

import API from '../lib/api'

import Spinner from './spinner'

const QueryButton = ({
  id,
  loading,
  setLoading,
}) => {
  return (
    <button
      className="rounded border-2 border-gray-400 pl-5 pr-5 pt-2 pb-2 w-1/3 flex justify-center"
      disabled={loading}
      onClick={() => {
        setLoading(true)
        API.get(`/executor/${id}`)
          .then((res) => {
            console.log(res.data)
            setLoading(false)
          })
          .catch((err) => {
            console.error(err)
            setLoading(false)
          })
      }}
    >
      {loading ? (
        <Spinner width="20" height="20" />
      ) : (
        `Execute Q${id} Query`
      )}
    </button>
  )
}

export default QueryButton