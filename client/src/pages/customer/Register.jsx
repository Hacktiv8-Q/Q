import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="columns is-centered is-vcentered">
      <div className="column is-6">
        <h1 className="title has-text-centered">Register</h1>
        <div className="box">
          <div className="field">
            <label className="label">First Name</label>
            <div className="control">
              <input className="input" type="text" placeholder="First name input" />
            </div>
          </div>
          <div className="field">
            <label className="label">Last Name</label>
            <div className="control">
              <input className="input" type="text" placeholder="First name input" />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input className="input" type="email" placeholder="Email input" />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input className="input" type="password" placeholder="Password" />
            </div>
          </div>
          <div className="field">
            <p className="control">
              <button className="button is-primary is-fullwidth">
                Register
              </button>
            </p>
          </div>
          <div className="field">
            <span>
              Already have an account? Login {' '}
            </span>
            <Link
              to="/login"
              className="button is-text p-0"
              style={{ alignItems: 'baseline' }}
            >
              here
            </Link>
          </div>
        </div>
      </div>
    </div>

  )
}
