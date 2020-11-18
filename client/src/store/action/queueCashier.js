import axios from 'config/axios'
import { FETCH_CASHIER_QUEUE } from 'store/types'

export const fetchCashierQueue = (outletId, token) => dispatch => {
  axios({
    url: '/queues/' + outletId,
    method: 'get',
    headers: { token }
  })
    .then(({ data }) => {
      dispatch({
        type: FETCH_CASHIER_QUEUE,
        payload: data.data.Queues
      })
    })
    .catch(console.log)
}

export const updateCashierQueue = ({ token, queueId, ...data }) => dispatch => {
  axios({
    url: '/queues/' + queueId,
    method: 'put',
    headers: { token },
    data
  })
    .then(() => {

    })
    .catch(console.log)
}
