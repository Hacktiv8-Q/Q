import { REGISTER_ADMIN } from '../types/index'

export function registerAdmin(customer) {
  return {
    type: REGISTER_ADMIN,
    payload: customer
  }
}

export const addRegisterAdmin = (admin) => {
  return (dispatch) => {
    fetch('http://localhost:3000/admins/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(admin)
    })
      .then(resp => resp.json())
      .then(admin => {
        dispatch(register(admin))
      })
      .catch(err => console.log(err))
  }
}