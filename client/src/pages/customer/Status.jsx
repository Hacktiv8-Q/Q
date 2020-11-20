import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "store/action/customer";
import { fetchQueue, clearQueue } from "../../store/action/queue"
import StatusQueue from "./StatusQueue"

import TreeImage from 'assets/tree_swing.svg'

export default function Status() {
  const { queue } = useSelector(state => state.queue)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(fetchQueue())
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    dispatch(logout())
    dispatch(clearQueue())
    history.push("/")
  }


  return (
    <div className="columns is-centered">
      <div className="column is-6">
        <h1 className="title has-text-centered">
          Home
        </h1>
        {
          queue.length > 0 ?
            queue.map(element => {
              return <StatusQueue key={element.id} outletId={element.OutletId} />
            })
            :
            (
              <div>
                <div className="columns is-centered is-mobile">
                  <div className="column is-three-quarters-mobile is-two-thirds-tablet is-two-thirds is-one-third-widescreen is-one-quarter-fullhd">
                    <figure className="image is-square">
                      <img src={TreeImage} />
                    </figure>
                  </div>
                </div>
                <h1 className="subtitle is-4 has-text-centered">
                  You don't have any queue
                </h1>
                <Link
                  to="/scan"
                  className="button is-primary is-medium is-fullwidth has-text-weight-semibold mb-5"
                >
                  <i className="fas fa-qrcode mr-3" />
                  Scan QRCode
                </Link>
                <Link
                  to="/categories"
                  className="button is-primary is-light is-active is-medium is-fullwidth has-text-weight-semibold mb-5"
                >
                  <i className="fas fa-search-location mr-3" />
                  Find Outlet
                </Link>
              </div>
            )
        }
        <div className="buttons has-addons is-centered">
          <button
            onClick={handleLogout}
            className="button is-danger is-medium is-rounded has-text-weight-semibold is-light"
          >
            <i className="fa fa-sign-out-alt" />{' '}
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
