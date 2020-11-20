import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { loginAdmin, loginCashier } from "../../store/action/admin";

export default function Login() {
  const [inputLogin, setInputLogin] = useState({ email: "", password: "", role: "owner" });
  const { token } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (localStorage.tokenAdmin) {
      history.push("/admin/outlet-list");
    }

    if (localStorage.tokenCashier) {
      history.push("/admin");
    }
  }, [token]);

  const handleInputLogin = (e) => {
    e.preventDefault();
    setInputLogin({
      ...inputLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    if (inputLogin.role === 'owner') {
      dispatch(loginAdmin(inputLogin));
    } else {
      dispatch(loginCashier(inputLogin));
    }
  };

  return (
    <div className="columns is-centered is-vcentered">
      <div className="column is-6">
        <div className="box">
          <h1 className="title has-text-centered">Admin Login</h1>
          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left has-icons-right">
              <input
                name="email"
                value={inputLogin.email}
                onChange={handleInputLogin}
                className="input"
                type="email"
                placeholder="Email input"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope" />
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control has-icons-left has-icons-right">
              <input
                name="password"
                value={inputLogin.password}
                onChange={handleInputLogin}
                className="input"
                type="password"
                placeholder="Password"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock" />
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label">Choose role</label>
            <div className="control">
              <div className="select">
                <select name="role" onChange={handleInputLogin}>
                  <option value="owner">Owner</option>
                  <option value="cashier">Cashier</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <p className="control">
              <button
                onClick={(e) => handleSubmitLogin(e)}
                className="button is-primary is-fullwidth"
              >
                Login
							</button>
            </p>
          </div>
          <div className="field">
            <span>Don't have an account? Register </span>
            <Link
              to="/admin/register"
              className="button is-text p-0"
              style={{ alignItems: "baseline" }}
            >
              here
						</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
