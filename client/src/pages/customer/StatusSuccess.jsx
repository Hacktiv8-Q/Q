import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export default function StatusQueue() {
  const { newQueue } = useSelector(state => state.queue)
  console.log(newQueue)
  return (
    <div className="columns is-centered is-vcentered">
      <div className="column is-6">
        <h1 className="title has-text-centered">
          Success
        </h1>
        <div className="circle-wrapper">
          <div className="circle-fill">
            <h1 className="has-text-centered">
              <i className="fas fa-check" />
            </h1>
          </div>
        </div>
        { newQueue.data && <p className="subtitle is-5 has-text-centered">
          You’ve added to the queue number {newQueue.data.totalQueue}
        </p>}
        <Link
          to="/status"
          className="button is-primary is-medium is-fullwidth has-text-weight-semibold"
        >
          OK
        </Link>
      </div>
    </div>
  )
}
