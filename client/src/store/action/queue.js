import axios from 'config/axios'
import { FETCH_QUEUE } from 'store/types'

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
