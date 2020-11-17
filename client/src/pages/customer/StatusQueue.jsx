import { Link } from "react-router-dom";

export default function StatusQueue() {
  return (
    <div className="columns is-centered is-vcentered">
      <div className="column is-6">
        <h1 className="title has-text-centered">
          Your Queue
        </h1>
        <div className="circle-wrapper">
          <div className="circle">
            <h1 className="has-text-centered">5</h1>
          </div>
        </div>
        <p className="subtitle is-5 has-text-centered">
          We’ll notify you when the queue is near
        </p>
        <div className="is-flex is-justify-content-center">
          <Link
            to="/qrcode-detail"
            className="button is-primary is-light"
          >
            Show Verification QR Code
          </Link>
        </div>
      </div>
    </div>
  )
}
