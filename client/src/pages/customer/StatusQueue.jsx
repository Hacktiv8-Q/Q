import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchQueueDetail } from "store/action/queue"

export default function StatusQueue(props) {
  const { queueDetail } = useSelector(state => state.queue)
  const dispatch = useDispatch()
  console.log(queueDetail, 'ini detail')

  useEffect(() => {
    console.log(props.outletId, ' ini props')
    dispatch(fetchQueueDetail(props.outletId))
  }, [props.outletId])

  const data = queueDetail?.find(el => {
    return el.queueDetail.OutletId === props.outletId
  })
  console.log(data, 'ini data')

  return (
    <div className="columns is-centered is-vcentered">
      <div className="column is-6">
        <h1 className="title has-text-centered">
          Your Queue
        </h1>
        <div className="circle-wrapper">
          <div className="circle">
            {queueDetail.length > 0 && <h1 className="has-text-centered mb-5">{data.data.totalQueue}</h1>}
          </div>
        </div>
        <p className="subtitle is-5 has-text-centered">
          We’ll notify you when the queue is near
        </p>
      </div>
    </div>
  )
}
