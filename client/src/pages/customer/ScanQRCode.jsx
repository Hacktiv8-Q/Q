import BackButton from 'components/BackButton'
import { useEffect, useState } from 'react'
import QrReader from 'react-qr-reader'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addQueue } from '../../store/action/queue'

export default function QueueStatus() {
  // const [result, setResult] = useState('No Result')
  const [scanNotDone, setScanNotDone] = useState(true)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleScan = data => {
    if (data) {
      // setResult(data)
      dispatch(addQueue(data))
      setScanNotDone(false)
      history.push("/status-success")
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
        <p className="subtitle has-text-centered mt-3">Scan QRCode from Outlet</p>
      </div>
    </div>
  )
}
