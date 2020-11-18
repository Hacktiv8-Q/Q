import BackButton from 'components/BackButton'
import { useState } from 'react'
import QrReader from 'react-qr-reader'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { requestFirebaseNotificationPermission } from 'firebaseInit';
import { addQueue, fetchQueueDetail, clearQueueDetail } from '../../store/action/queue'

export default function QueueStatus() {
  const [deviceToken, setDeviceToken] = useState('');
  const [scanNotDone, setScanNotDone] = useState(true)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleScan = data => {
    if (data) {
      const payload = {
        deviceToken,
        outletId: data
      }
      dispatch(addQueue(payload))
      // dispatch(fetchQueueDetail(data))
      setScanNotDone(false)
      dispatch(clearQueueDetail())
      history.push("/status-success")
    }
  }

  const handleError = err => {
    console.error(err)
  }

  requestFirebaseNotificationPermission()
    .then(firebaseToken => {
      // console.log('firebaseToken', firebaseToken);
      setDeviceToken(firebaseToken)
    })
    .catch(err => console.log('error', err));

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
