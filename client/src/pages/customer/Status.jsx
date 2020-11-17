import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "store/action/customer";
import { fetchQueue } from "../../store/action/queue"
import StatusQueue from "./StatusQueue"

export default function Status() {
  const { queue } = useSelector(state => state.queue)
  const dispatch = useDispatch()
  const history = useHistory()
  console.log(queue, 'ini queue')

  useEffect(() => {
    dispatch(fetchQueue())
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    dispatch(logout())
    history.push("/")
  }


  return (
    <div className="columns is-centered is-vcentered">
      <div className="column is-6">
        {
          queue.length > 0 ?
            queue.map(element => {
              return <StatusQueue key={element.id} outletId={element.OutletId} />
            })
            :
            (
              <div>
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
                  className="button is-primary is-medium is-fullwidth has-text-weight-semibold mb-5"
                >
                  Scan QRCode
                </Link>
              </div>
            )
        }
        <div class="buttons has-addons is-centered">
          <button onClick={handleLogout} className="button is-danger is-medium is-rounded has-text-weight-semibold">Logout</button>
        </div>
      </div>
    </div>
  )
}
