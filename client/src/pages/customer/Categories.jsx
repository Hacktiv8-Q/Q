import BackButton from "components/BackButton";
import { Link } from "react-router-dom";

export default function Categories() {
  return (
    <div className="columns is-centered is-vcentered">
      <div className="column is-6">
        <BackButton />
        <h1 className="title">
          Categories
        </h1>
        <div className="content">
          <div className="panel list-group">
            <Link to="/outlet-list" className="panel-block list-group-item" href="!#">
              Kesehatan
            </Link>
            <a className="panel-block list-group-item" href="!#">
              Tempat Makan
            </a>
            <a className="panel-block list-group-item" href="!#">
              Otomotif
            </a>
            <a className="panel-block list-group-item" href="!#">
              Others
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
