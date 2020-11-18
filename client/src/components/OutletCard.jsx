import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteOutlet } from 'store/action/outlet'

const OutletCard = (props) => {
  const history = useHistory()
  const dispatch = useDispatch()

  function handleDelete() {
    dispatch(deleteOutlet(props.id))
  }

  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={props.image_url} alt="Placeholder image" />
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
      </div>
      <footer className="card-footer">
        <a onClick={() => history.push('/admin/register-cashier/' + props.id)} className="card-footer-item">Add Cashier</a>
        <a onClick={() => history.push('/admin/edit-outlet/' + props.id)} className="card-footer-item">Edit Outlet</a>
        <a onClick={handleDelete} className="card-footer-item">Delete Outlet</a>
      </footer>
    </div>
  )
}

export default OutletCard
