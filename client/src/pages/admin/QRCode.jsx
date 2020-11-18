import { useState, useEffect } from "react"
import QRCode from 'qrcode.react'
import BackButton from 'components/BackButton'

export default function QRCodePage() {
  const [outletId, setOutletId] = useState('')
  useEffect(() => {
    if (localStorage.outletId) {
      setOutletId(+localStorage.outletId)
    }
  }, [])

  return (
    <div className="columns is-centered is-vcentered">
      <div className="column is-6">
        <BackButton />
        <h1 className="title has-text-centered">Scan Me</h1>
        <div className="container">
          <div className="columns is-centered">
            <div className="column">
              <QRCode
                value={outletId}
                size="500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
