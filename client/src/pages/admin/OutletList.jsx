import { Link, useHistory } from "react-router-dom";
import OutletCard from 'components/OutletCard'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from "react";
import { fetchOutlet } from "store/action/outlet";

export default function OutletList() {
  const [isOpen, setIsOpen] = useState(false)
  const { outlets } = useSelector(state => state.outlet)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(fetchOutlet())
  }, [dispatch])

  const logout = e => {
    e.preventDefault()
    localStorage.clear()
    history.push("/admin/login")
  }

  // console.log('outlets', outlets)

  return (
    <div className="columns is-centered is-vcentered">
      <div className="column is-10">
        <div className="is-flex is-flex-direction-row-reverse">
          <div className={`dropdown is-right ${isOpen && 'is-active'}`}>
            <div className="dropdown-trigger">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="button is-primary"
                aria-haspopup="true"
                aria-controls="dropdown-menu"
              >
                <span>More</span>
                <span className="icon is-small">
                  <i className="fas fa-angle-down" aria-hidden="true" />
                </span>
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
              <div className="dropdown-content">
                <Link
                  className="dropdown-item"
                  to="/admin/outlet-add"
                >
                  <i className="fa fa-plus" />{' '}
                  <b>Add Outlet</b>
                </Link>
                <hr className="dropdown-divider" />
                <a
                  href="!#"
                  className="dropdown-item has-text-danger has-background-danger-light"
                  onClick={logout}
                >
                  <i className="fa fa-sign-out-alt" />{' '}
                  <b>Logout</b>
                </a>
              </div>
            </div>
          </div>
        </div>
        <h1 className="title has-text-centered">Outlet List</h1>
        <div className="columns">
          {outlets.length > 0 && outlets.map(outlet => (
            <div key={outlet.id} className="column is-6">
              <OutletCard
                id={outlet.id}
                image_url={outlet.image_url}
                name={outlet.name}
                description={outlet.description}
                category={outlet.category}
              />
            </div>
          ))
          }
        </div>
      </div>
    </div>
  )
}
