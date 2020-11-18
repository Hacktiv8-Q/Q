import axios from 'config/axios'
import { REGISTER_ADMIN } from '../types/index'

export function registerAdmin(customer) {
  return {
    type: REGISTER_ADMIN,
    payload: customer
  }
}

export const addRegisterAdmin = (admin) => {
  return (dispatch) => {
    axios({
      method: 'post',
      url: '/admins/register',
      data: admin
    })
      .then(({ data }) => {
        dispatch(register(data))
      })
      .catch(err => console.log(err))
  }
}
