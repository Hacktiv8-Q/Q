import axios from 'config/axios'
import { FETCH_OUTLET, ADD_OUTLET, FETCH_OUTLET_ADMIN, FETCH_OUTLET_ADMIN_BY_ID  } from 'store/types'

export const fetchAllOutlet = () => dispatch => {
  axios({
    method: 'get',
    url: 'http://localhost:3000/outlets/customer',
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
export const addOutlet = (payload) => (dispatch) => {
  axios({
    method: "post",
    url: "http://localhost:3000/outlets/",
    data: payload,
    headers: { token: localStorage.getItem('tokenAdmin') }
  })
    .then(({ data }) => {
      console.log(data)
      dispatch({
        type: ADD_OUTLET,
        payload: data.token,
      });
    })
    .catch(err => console.log(err));
};
export const fetchOutlet = () => (dispatch) => {
  axios({
    method: 'get',
    url: 'http://localhost:3000/outlets/admin',
    headers: { token: localStorage.getItem('tokenAdmin')}
  })
    .then(({ data }) => {
      console.log(data.Outlets, 'asup ti fetchoutlet')
      dispatch({
        type: FETCH_OUTLET_ADMIN,
        payload: data.Outlets
      })
    })
    .catch(err => console.log(err))
}
export const fetchOutletById = (payload) => (dispatch) => {
  axios({
    method: 'get',
    url: `http://localhost:3000/outlets/${payload}`,
    headers: { token: localStorage.getItem('tokenAdmin')}
  })
    .then(({ data }) => {
      console.log(data.data, 'ASUP TI FETCHOUTLETBYID')
      dispatch({
        type: FETCH_OUTLET_ADMIN_BY_ID,
        payload: data.data
      })
    })
    .catch(err => console.log(err))
}
export const editOutlet = (payload) => (dispatch) => {
  axios({
    method: 'put',
    url: `http://localhost:3000/outlets/${payload.id}`,
    headers: { token: localStorage.getItem('tokenAdmin')},
    data: {
      name: payload.name,
      description: payload.description,
      category: payload.category,
      image_url: payload.image_url
    }
  })
    .then(({ data }) => {
      console.log(data.data, 'ASUP TI FETCHOUTLETBYID')
      dispatch({
        type: FETCH_OUTLET_ADMIN_BY_ID,
        payload: data.data
      })
      dispatch(fetchOutlet())
    })
    .catch(err => console.log(err))
}
export const deleteOutlet = (payload) => (dispatch) => {
  axios({
    method: 'delete',
    url: `http://localhost:3000/outlets/${payload}`,
    headers: { token: localStorage.getItem('tokenAdmin')}
  })
    .then(() => {
      dispatch(fetchOutlet())
    })
    .catch(err => console.log(err))
}