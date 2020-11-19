import BackButton from 'components/BackButton'
import QRCode from 'qrcode.react'
import { useLocation } from 'react-router-dom'

export default function QRCodeDetail() {
  const location = useLocation()

  return (
    <div className="columns is-centered is-vcentered">
      <div className="column is-6">
        <BackButton />
        <h1 className="title has-text-centered">
          Your Verification QR Code
        </h1>
        <div className="container has-text-centered p-2 border-light has-shadow">
          <QRCode
            value={location.state.uniqueCode}
            size="300"
          />
        </div>
      </div>
    </div>
  )
}
