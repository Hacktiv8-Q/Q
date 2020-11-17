import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchQueue } from "../../store/action/queue"
import StatusQueue from "./StatusQueue"

export default function Status() {
  const { queue } = useSelector(state => state.queue)
  const dispatch = useDispatch()
  console.log(queue, 'ini queue')

  useEffect(() => {
    dispatch(fetchQueue())
  }, [])

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
                  className="button is-primary is-medium is-fullwidth has-text-weight-semibold"
                >
                  Scan QRCode
                </Link>
              </div>
            )
        }

      </div>
    </div>
  )
}
