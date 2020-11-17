import axios from 'config/axios'
import { FETCH_OUTLET } from 'store/types'

export const fetchOutlet = () => dispatch => {
  axios({
    method: 'get',
    url: 'http://localhost:3000/outlets/',
    headers: { token: localStorage.tokenCustomer }
  })
    .then(({ data }) => {
      dispatch({
        type: FETCH_OUTLET,
        payload: data.data
      })
    })
    .catch(console.log)
}