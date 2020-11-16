import { Link } from "react-router-dom";

export default function ChooseRole() {
  return (
    <div className="columns is-centered is-vcentered">
      <div className="column is-8">
        <div className="box border-light py-5">
          <h1 className="title has-text-centered pt-5">
            Welcome Back to <abbr title="Queue App">Q App</abbr>!
          </h1>
          <h1 className="subtitle has-text-centered has-text-grey">
            We're so excited to see you again!
                </h1>
          <div className="columns mt-5 pb-3">
            <div className="column is-flex is-align-items-center is-justify-content-center">
              <h1 className="title is-2 has-text-centered">Sign in as</h1>
            </div>
            <div className="column">
              <button className="button is-medium is-primary is-fullwidth mb-2">
                <b>Merchant</b>
              </button>
              <p className="subtitle is-6 has-text-centered mb-2">OR</p>
              <Link to="/login" className="button is-primary is-outlined is-medium is-fullwidth">
                <b>Customer</b>
              </Link>
              <br />
              <Link
                to="/notification"
                className="button is-danger is-outlined is-medium is-fullwidth"
              >
                <b>Go to Notification</b>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
