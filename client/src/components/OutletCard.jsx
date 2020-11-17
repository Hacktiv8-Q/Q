import React from 'react'

const OutletCard = (props) => {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image"/>
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          </div>
          <div>
            <p className="title is-4">John Smith</p>
          </div>

        <div className="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus nec iaculis mauris. <a>@bulmaio</a>.
          <a href="#">#css</a> <a href="#">#responsive</a>
          <br/>
        </div>
      </div>
      <footer className="card-footer">
    <a href="#" className="card-footer-item">Add Cashier</a>
    <a href="#" className="card-footer-item">Edit Outlet</a>
    <a href="#" className="card-footer-item">Delete Outlet</a>
  </footer>
    </div>
  )
}

export default OutletCard