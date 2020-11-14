import BackButton from "components/BackButton";
import { Link } from "react-router-dom";

export default function OutletList() {
  return (
    <div className="columns is-centered is-vcentered">
      <div className="column is-6">
        <div className="is-flex is-justify-content-space-between">
          <BackButton />
          <Link
            className="button is-primary"
            to="/admin/outlet-add"
          >
            Add Outlet
          </Link>
        </div>
        <h1 className="title has-text-centered">Outlet List</h1>
        <div className="content">
          <div className="panel list-group">
            <a className="panel-block list-group-item" href="!#">
              Sido Mulyo Coffe
            </a>
            <a className="panel-block list-group-item" href="!#">
              Soto Jaya
            </a>
            <a className="panel-block list-group-item" href="!#">
              Dorayaki Kekinian
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
