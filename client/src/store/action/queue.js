import axios from 'config/axios'
import { FETCH_QUEUE, ADD_QUEUE, FETCH_QUEUE_DETAIL } from 'store/types'

export const fetchQueue = () => dispatch => {
  axios({
    method: 'get',
    url: 'http://localhost:3000/queues/',
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
    url: 'http://localhost:3000/queues/' + outletId,
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

export const addQueue = (OutletId) => dispatch => {
  axios({
    method: 'post',
    url: 'http://localhost:3000/queues/' + OutletId,
    headers: { token: localStorage.tokenCustomer }
  })
    .then(({ data }) => {
      dispatch({
        type: ADD_QUEUE,
        payload: data
      })
    })
    .catch(console.log)
}
