import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="columns is-centered is-vcentered">
      <div className="column is-6">
        <h1 className="title has-text-centered">Home</h1>
        <div className="buttons">
          <Link
            to="/admin/qrcode"
            className="button is-medium is-primary is-fullwidth"
          >
            <b>
              SHOW QRCODE
            </b>
          </Link>
          <Link
            to="/admin/queue-list"
            className="button is-medium has-background-white-ter is-fullwidth"
          >
            <b>
              QUEUE LIST
            </b>
          </Link>
        </div>
      </div>
    </div>
  )
}
