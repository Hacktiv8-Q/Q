import BackButton from 'components/BackButton'
import { useEffect, useState } from 'react'
import QrReader from 'react-qr-reader'

export default function QueueStatus() {
  const [result, setResult] = useState('No Result')
  const [hash, setHash] = useState('')

  useEffect(() => {
    if (result !== 'No Result') {
      fakeRequest(result)
        .then(res => {
          console.log('res', res)
          setHash(res)
        })
    }
  }, [result])

  const handleScan = data => {
    if (data) {
      setResult(data)
    }
  }

  const handleError = err => {
    console.error(err)
  }

  const fakeRequest = data => {
    return new Promise(res => {
      setTimeout(() => {
        res(data)
      }, 2000)
    })
  }

  const sendQRCode = () => {
    setResult('HelloWorlHashedWithBcrypt')
  }

  return (
    <div className="columns is-centered is-vcentered">
      <div className="column is-5">
        <BackButton />
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
        <p className="subtitle has-text-centered mt-3">{result}</p>
        <button onClick={sendQRCode} className="button is-link is-light">Fake Request</button>
      </div>
    </div>
  )
}
