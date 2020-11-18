import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import QrReader from 'react-qr-reader'
import BackButton from 'components/BackButton'
import { updateCashierQueue } from 'store/action/queueCashier'

export default function QueueStatus() {
  const [scanNotDone, setScanNotDone] = useState(true)
  const dispatch = useDispatch()
  const history = useHistory()
  const { queueId } = useParams()

  const outletId = localStorage.outletId
  const token = localStorage.getItem("tokenCashier")

  const handleScan = data => {
    if (data) {
      const payload = {
        status: 'in',
        outletId,
        uniqueCode: data,
        token,
        queueId
      }

      dispatch(updateCashierQueue(payload))
      setScanNotDone(false)
      history.push("/admin/queue-list")
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
      </div>
    </div>
  )
}
