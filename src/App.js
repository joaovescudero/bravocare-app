import { useState, useEffect, useCallback } from 'react'

import API from './lib/api'

import Card from './components/card'
import QueryButton from './components/query-button'
import Spinner from './components/spinner'

function App() {
  const [selected, setSelected] = useState([])

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [dataOverlap, setDataOverlap] = useState(null)
  const [loadingOverlap, setLoadingOverlap] = useState(false)
  const [loadingQuery, setLoadingQuery] = useState(false)

  useEffect(() => {
    setLoading(true)
    API.get('/shift')
      .then((res) => {
        setData(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const calculateOverlap = useCallback(() => {
    if (selected.length !== 2) return
    setLoadingOverlap(true)
    API.get(`/shift/calculate-overlap?shift_a_id=${selected[0]}&shift_b_id=${selected[1]}`)
      .then((res) => {
        setDataOverlap(res.data)
        setLoadingOverlap(false)
      })
      .catch((err) => {
        console.error(err)
        setLoadingOverlap(false)
      })
  }, [selected])
  useEffect(() => {
    if (selected.length !== 2) return
    setLoadingOverlap(true)
    calculateOverlap()
  }, [selected, calculateOverlap])

  const onSelect = (id) => {
    if (selected.includes(id)) {
      setSelected((old) => old.filter((item) => item !== id))
      return
    }
    if (selected.length > 1) return
    setSelected([...selected, id])
  }

  return (
    <div className="flex justify-center content-center flex-col max-w-xl gap-8">
      <div
        className="flex flex-row justify-between content-center gap-44 rounded border-2 border-gray-400 pl-6 pr-6 pb-4 pt-4">
        {selected.length !== 2 && (
          <div className="pt-6 pb-6">
            <span>Please select two shifts</span>
          </div>
        )}
        {selected.length === 2 && loadingOverlap && (
          <Spinner />
        )}
        {selected.length === 2 && !loadingOverlap && (
          <>
            <div className="flex flex-col">
              <span>Overlap Minutes: {dataOverlap?.overlapMinutes}</span>
              <span>Max Overlap Threshold: {dataOverlap?.maxOverlapThreshold}</span>
              <span>Exceeds Overlap Threshold: {dataOverlap?.exceedsThreshold ? 'True' : 'False'}</span>
            </div>
            <div className="flex justify-center flex-col">
              <button className="rounded border-2 border-gray-400 pl-5 pr-5 pt-2 pb-2">Submit</button>
            </div>
          </>
        )}
      </div>
      {loading && (
        <Spinner />
      )}
      {!loading && (
        <div className="flex flex-row flex-wrap gap-7">
          {data?.rows?.map((item) => (
            <Card
              key={`shift-card-${item.shift_id}`}
              onClick={onSelect}
              selected={selected.includes(item.shift_id)}
              data={item}
            />
          ))}
        </div>
      )}
      <div
      className="flex flex-row justify-between mt-10 gap-1"
      >
        <QueryButton
          id={4}
          loading={loadingQuery}
          setLoading={setLoadingQuery}
        />
        <QueryButton
          id={5}
          loading={loadingQuery}
          setLoading={setLoadingQuery}
        />
        <QueryButton
          id={6}
          loading={loadingQuery}
          setLoading={setLoadingQuery}
        />
      </div>
    </div>
  )
}

export default App
