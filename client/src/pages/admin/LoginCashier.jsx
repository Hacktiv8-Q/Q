import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { loginCashier } from "../../store/action/admin";

export default function LoginCashier() {
	const [inputLogin, setInputLogin] = useState({ email: "", password: "" });
	const { token } = useSelector((state) => state.customer);
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		localStorage.setItem("tokenCustomer", token);
		if (localStorage.tokenCustomer) {
			history.push("/status");
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
		dispatch(loginCashier(inputLogin));
	};

	return (
		<div className="columns is-centered is-vcentered">
			<div className="column is-6">
				<h1 className="title has-text-centered">Cashier Login</h1>
				<div className="box">
					<div className="field">
						<label className="label">Email</label>
						<div className="control has-icons-left has-icons-right">
							<input
								name="email"
								value={inputLogin.email}
								onChange={(e) => handleInputLogin(e)}
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
								onChange={(e) => handleInputLogin(e)}
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
							to="/register"
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
