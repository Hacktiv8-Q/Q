import BackButton from 'components/BackButton'
import QRCode from 'qrcode.react'

export default function QRCodeDetail() {
  console.log('QRCodeDetail render')
  return (
    <div className="columns is-centered is-vcentered">
      <div className="column is-6">
        <BackButton />
        <h1 className="title has-text-centered">
          Your Verification QR Code
        </h1>
        <div className="container has-text-centered py-5">
          <QRCode
            value="HelloWorlHashedWithBcrypt"
            size="300"
          />
        </div>
      </div>
    </div>
  )
}
