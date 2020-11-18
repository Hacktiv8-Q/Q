import axios from 'config/axios'
import { FETCH_QUEUE, ADD_QUEUE, FETCH_QUEUE_DETAIL, CLEAR_QUEUE } from 'store/types'

export const fetchQueue = () => dispatch => {
  axios({
    method: 'get',
    url: '/queues/',
    headers: { token: localStorage.tokenCustomer }
  })
    .then(({ data }) => {
      dispatch({
        type: FETCH_QUEUE,
        payload: data.data
      })
    })
    .catch(console.log)
}

export const fetchQueueDetail = (outletId) => dispatch => {
  axios({
    method: 'get',
    url: '/queues/' + outletId,
    headers: { token: localStorage.tokenCustomer }
  })
    .then(({ data }) => {
      dispatch({
        type: FETCH_QUEUE_DETAIL,
        payload: data
      })
    })
    .catch(console.log)
}

export const addQueue = ({ deviceToken, outletId }) => dispatch => {
  axios({
    method: 'post',
    url: '/queues/' + outletId,
    headers: { token: localStorage.tokenCustomer },
    data: { deviceToken }
  })
    .then(({ data }) => {
      dispatch({
        type: ADD_QUEUE,
        payload: data
      })
    })
    .catch(console.log)
}

export const clearQueue = () => {
  return {
    type: CLEAR_QUEUE
  }
}
