import React, {useState} from"react"
import { Link } from "react-router-dom";
import {useDispatch} from "react-redux"
import {register} from ".../store/actions/register"

export default function Login() {
  return (
    <div className="columns is-centered is-vcentered">
      <div className="column is-6">
        <h1 className="title has-text-centered">Login</h1>
        <div className="box">
          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left has-icons-right">
              <input className="input" type="email" placeholder="Email input" />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope" />
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control has-icons-left has-icons-right">
              <input className="input" type="password" placeholder="Password" />
              <span className="icon is-small is-left">
                <i className="fas fa-lock" />
              </span>
            </div>
          </div>
          <div className="field">
            <p className="control">
              <button className="button is-primary is-fullwidth">
                Login
              </button>
            </p>
          </div>
          <div className="field">
            <span>
              Don't have an account? Register {' '}
            </span>
            <Link
              to="/register"
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
