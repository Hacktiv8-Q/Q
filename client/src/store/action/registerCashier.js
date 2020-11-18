import axios from 'config/axios'
import { REGISTER_CASHIER } from '../types/index'

export const registerCashier = (payload) => (dispatch) => {
  axios({
    method: 'post',
    url: '/admins/register-cashier',
    data: payload,
    headers: { token: localStorage.getItem('tokenAdmin') }
  })
    .then(data => {
      dispatch({
        type: REGISTER_CASHIER,
        payload: data
      })
    })
    .catch(err => console.log(err))
}
