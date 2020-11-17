import axios from "config/axios";
import { ADD_OUTLET, FETCH_OUTLET_ADMIN } from "store/types";

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