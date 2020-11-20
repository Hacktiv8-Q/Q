import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2';
import { deleteOutlet } from 'store/action/outlet'

const OutletCard = (props) => {
  const history = useHistory()
  const dispatch = useDispatch()

  function handleDelete() {
    Swal.fire({
      title: 'Delete this outlet?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00d1b2',
      cancelButtonColor: '#f14668',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(deleteOutlet(props.id))
      }
    })
  }

  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={props.image_url} alt="Placeholder" />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
        </div>
        <div>
          <p className="title is-4">{props.name}</p>
        </div>

        <div className="content">
          {props.description}
          <br />
        </div>
        {props.cashiers.length > 0 ? props.cashiers.map((cashier, i) => (
          <p
            key={cashier.id}
            className="subtitle is-6"
          >
            {`${i + 1}. ${cashier.firstName} ${cashier.lastName}`}
          </p>
        )) : <p className="subtitle is-6">-</p>}
      </div>
      <footer className="card-footer">
        <a onClick={() => history.push('/admin/register-cashier/' + props.id)} className="card-footer-item">
          <i className="fas fa-user mr-3" />
          <span className="is-hidden-mobile">Add Cashier</span>
        </a>
        <a onClick={() => history.push('/admin/edit-outlet/' + props.id)} className="card-footer-item">
          <i className="fas fa-edit mr-3" />
          <span className="is-hidden-mobile">
            Edit Outlet
          </span>
        </a>
        <a onClick={handleDelete} className="card-footer-item">
          <i className="fas fa-trash mr-3" />
          <span className="is-hidden-mobile">
            Delete Outlet
          </span>
        </a>
      </footer>
    </div>
  )
}

export default OutletCard
