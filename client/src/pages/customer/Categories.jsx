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
            <Link
              to={{
                pathname: "/outlet-list",
                state: {
                  name: "Healt Care",
                  category: "kesehatan"
                }
              }}
              className="panel-block list-group-item"
            >
              Healt Care
            </Link>
            <Link
              to={{
                pathname: "/outlet-list",
                state: {
                  name: "Restaurants",
                  category: "tempat-makan"
                }
              }}
              className="panel-block list-group-item"
            >
              Restaurants
            </Link>
            <Link
              to={{
                pathname: "/outlet-list",
                state: {
                  name: "Automotive",
                  category: "otomotif"
                }
              }}
              className="panel-block list-group-item"
            >
              Automotive
            </Link>
            <Link
              to={{
                pathname: "/outlet-list",
                state: {
                  name: "Others",
                  category: "lain"
                }
              }}
              className="panel-block list-group-item"
            >
              Others
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
