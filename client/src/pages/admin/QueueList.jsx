import BackButton from "components/BackButton";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCashierQueue } from "store/action/queueCashier";

export default function QueueList() {
  const outletId = localStorage.outletId
  const token = localStorage.getItem("tokenCashier")
  const dispatch = useDispatch()
  const queues = useSelector(state => state.queueCashier.queues)

  useEffect(() => {
    dispatch(fetchCashierQueue(outletId, token))
  }, [])

  return (
    <div className="columns is-centered is-vcentered">
      <div className="column is-8">
        <BackButton />
        <h1 className="title">
          Queue List
        </h1>
        <div className="content">
          <table className="table is-hoverable">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="list-group">
              {
                queues?.length > 0 &&
                queues?.filter(elem => elem.status == 'queue')?.map((queue, i) => (
                  <tr key={queue.id} className="list-group-item">
                    <td>
                      {i + 1}
                    </td>
                    <td>
                      {`${queue.Customer.firstName} ${queue.Customer.lastName}`}
                    </td>
                    <td>
                      {
                        queue.status === 'queue' && (
                          <Link
                            className="button is-warning"
                            to={`/admin/scan/${queue.id}`}
                          >
                            <b>Q</b>
                          </Link>
                        )
                      }
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        <h1 className="title">
          History Queue
        </h1>
        <div className="columns">
          <div className="column is-8">
            <div className="content">
              <div className="panel list-group">
                {
                  queues?.length > 0 ?
                    queues?.filter(elem => elem.status == 'out')?.map((queue, i) => (
                      <div className="panel list-group">
                        <a className="panel-block list-group-item disabled" href="!#">
                          {i + 1}. {`${queue.Customer.firstName} ${queue.Customer.lastName}`}
                        </a>
                      </div>
                    ))
                    : <p className="subtitle p-3">No queue history</p>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
