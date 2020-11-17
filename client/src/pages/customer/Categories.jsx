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
            <Link to={{pathname:"/outlet-list", state: {category: "kesehatan"}}} className="panel-block list-group-item">
              Kesehatan
            </Link>
            <Link to={{pathname:"/outlet-list", state: {category: "tempat makan"}}} className="panel-block list-group-item">
            Tempat Makan
            </Link>
            <Link to={{pathname:"/outlet-list", state: {category: "otomotif"}}} className="panel-block list-group-item">
            Otomotif
            </Link>
            <Link to={{pathname:"/outlet-list", state: {category: "others"}}} className="panel-block list-group-item">
            Others
            </Link>
           </div>
        </div>
      </div>
    </div>
  )
}
