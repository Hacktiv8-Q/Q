import axios from 'config/axios'
import { FETCH_QUEUE, ADD_QUEUE } from 'store/types'

export const fetchQueue = () => dispatch => {
  axios({
    method: 'get',
    url: ''
  })
    .then(({ data }) => {
      dispatch({
        type: FETCH_QUEUE,
        payload: data
      })
    })
    .catch(console.log)
}

export const addQueue = (OutletId) => dispatch => {
  axios({
    method: 'post',
    url: 'http://localhost:3000/queues/' + OutletId,
    headers: {token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJiYXNpbGl1c0BnbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MDU0NTU1MTh9.pqtIU31pNfRKzXBlgJQ6QXl2K7Q6OdEN5NPUnFXcsK0"}
  })
    .then(({ data }) => {
      dispatch({
        type: ADD_QUEUE,
        payload: data
      })
    })
    .catch(console.log)
}
