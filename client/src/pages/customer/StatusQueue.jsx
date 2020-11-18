import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { onMessageListener } from "firebaseInit"
import { fetchQueueDetail } from "store/action/queue"

export default function StatusQueue(props) {
  const { queueDetail } = useSelector(state => state.queue)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchQueueDetail(props.outletId))
  }, [props.outletId])

   const data = queueDetail?.find(el => {
    return el.queueDetail.OutletId === props.outletId
  })
  console.log(queueDetail, 'ini queuedetail', )

  onMessageListener()
    .then((payload) => {
      const { title, body } = payload.data;
      console.log(`message ${title}; ${body}`);
    })
    .catch((err) => {
      console.error(JSON.stringify(err));
    });

  return (
    <div className="columns is-centered is-vcentered">
      <div className="column is-6">
        <h1 className="title has-text-centered">
          Your Queue
        </h1>
        <div className="circle-wrapper">
          <div className="circle">
            {data && <h1 className="has-text-centered mb-5">{data.data.queueNumber}</h1>}
          </div>
        </div>
        <p className="subtitle is-5 has-text-centered">
          We’ll notify you when the queue is near
        </p>
        <div className="is-flex is-justify-content-center">
          {
            data && (
              <Link
                to={{ pathname: "/qrcode-detail", state: { uniqueCode: data.data.uniqueCode } }}
                className="button is-primary is-light"
              >
                Show Verification QR Code
              </Link>
            )
          }
        </div>
      </div>
    </div>
  )
}
