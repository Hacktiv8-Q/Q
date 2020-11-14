import BackButton from 'components/BackButton'
import { useState } from 'react'
import QrReader from 'react-qr-reader'

export default function QueueStatus() {
  const [result, setResult] = useState('No Result')

  const handleScan = data => {
    if (data) {
      setResult(data)
    }
  }

  const handleError = err => {
    console.error(err)
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
      </div>
    </div>
  )
}
