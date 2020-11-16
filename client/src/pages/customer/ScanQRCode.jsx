import BackButton from 'components/BackButton'
import { useState } from 'react'
import QrReader from 'react-qr-reader'
import { useDispatch, useSelector } from 'react-redux'
import { addQueue } from '../../store/action/queue'

export default function QueueStatus() {
  const [result, setResult] = useState('No Result')
  const [scanNotDone, setScanNotDone] = useState(true)
  const { newQueue } = useSelector(state => state.queue)
  const dispatch = useDispatch()

  const handleScan = data => {
    if (data) {
      setResult(data)
      dispatch(addQueue(data))
      setScanNotDone(false)
    }
  }

  const handleError = err => {
    console.error(err)
  }

  return (
    <div className="columns is-centered is-vcentered">
      <div className="column is-5">
        <BackButton />
        {scanNotDone &&
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%' }}
          />
        }
        <p className="subtitle has-text-centered mt-3">{JSON.stringify(newQueue)}</p>
        <p className="subtitle has-text-centered mt-3">{result}</p>
      </div>
    </div>
  )
}
