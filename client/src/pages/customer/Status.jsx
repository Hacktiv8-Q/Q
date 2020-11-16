import { Link } from "react-router-dom";

export default function Status() {
  return (
    <div className="columns is-centered is-vcentered">
      <div className="column is-6">
        <h1 className="title has-text-centered">
          You don't have any queue
        </h1>
        <Link
          to="/categories"
          className="button is-primary is-medium is-fullwidth has-text-weight-semibold mb-5"
        >
          ADD QUEUE
        </Link>
        <Link
          to="/scan"
          className="button is-primary is-medium is-fullwidth has-text-weight-semibold"
        >
          Scan QRCode
        </Link>
      </div>
    </div>
  )
}
