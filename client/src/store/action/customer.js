import axios from 'config/axios'
import { LOGIN, LOGOUT } from 'store/types'

export const login = (dataLogin) => dispatch => {
  axios({
    method: 'post',
    url: 'http://localhost:3000/customers/login',
    data: {email: dataLogin.email, password: dataLogin.password}
  })
    .then(({ data }) => {
      dispatch({
        type: LOGIN,
        payload: data.token
      })
    })
    .catch(console.log)
}

export const logout = () => {
  return {
    type: LOGOUT,
    payload: ""
  }
}
