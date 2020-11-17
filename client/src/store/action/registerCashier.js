import { REGISTER_CASHIER } from '../types/index'

export function registerCashier(customer) {
  return {
    type: REGISTER_CASHIER,
    payload: customer
  }
}

export const addRegisterCashier = (cashier) => {
  return (dispatch) => {
    fetch('http://localhost:3000/admins/register-cashier', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cashier)
    })
      .then(resp => resp.json())
      .then(cashier => {
        dispatch(register(cashier))
      })
      .catch(err => console.log(err))
  }
}