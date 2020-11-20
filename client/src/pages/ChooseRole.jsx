import { Link } from "react-router-dom";
import logo from 'q-logo.png'

export default function ChooseRole() {
  return (
    <div className="columns is-centered is-vcentered">
      <div className="column is-8">
        <div className="box border-light py-5">
          <div className="columns is-centered is-mobile">
            <div className="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
              <figure className="image is-square">
                <img src={logo} />
              </figure>
            </div>
          </div>
          <h1 className="title has-text-centered pt-5">
            Welcome Back to <abbr className="is-flex-mobile is-hidden-mobile" title="Queue App">Q App!</abbr>
            <br />
            <abbr className="is-hidden-tablet" title="Queue App">Q App!</abbr>
          </h1>
          <h1 className="subtitle has-text-centered has-text-grey">
            We're so excited to see you again!
					</h1>
          <div className="columns mt-5 pb-3">
            <div className="column is-flex is-align-items-center is-justify-content-center">
              <h1 className="title is-2 has-text-centered">Sign in as</h1>
            </div>
            <div className="column">
              <Link
                to="/admin/login"
                className="button is-medium is-primary is-fullwidth mb-2"
              >
                <b>Merchant</b>
              </Link>
              <p className="subtitle is-6 has-text-centered mb-2">OR</p>
              <Link
                to="/login"
                className="button is-primary is-outlined is-medium is-fullwidth"
              >
                <b>Customer</b>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
