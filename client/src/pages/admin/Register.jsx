import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addRegister } from "../../store/action/register";
import { useHistory } from "react-router-dom";

const Register = () => {
	const [customer, setCustomer] = useState({});
	const [error, setError] = useState("");

	const dispatch = useDispatch();
	let history = useHistory();

	const handleInput = (e) => {
		e.preventDefault();
		setCustomer({
			...customer,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		//{ firstName, lastName, email, password }
		if (!customer.firstName) {
			setError("first name is required");
		} else if (!customer.lastName) {
			setError("Last name is required");
		} else if (!customer.email) {
			setError("email is required");
		} else if (!customer.password) {
			setError("password is required");
		} else {
			dispatch(addRegister(customer));
			history.push("/");
		}
	};

	return (
		<div className="columns is-centered is-vcentered">
			<div className="column is-6">
				<h1 className="title has-text-centered">Register</h1>
				<div className="box">
					<div className="field">
						<label className="label">First Name</label>
						<div className="control">
							<input
								name="firstName"
								onChange={(e) => handleInput(e)}
								className="input"
								type="text"
								placeholder="First name input"
							/>
						</div>
					</div>
					<div className="field">
						<label className="label">Last Name</label>
						<div className="control">
							<input
								name="lastName"
								onChange={(e) => handleInput(e)}
								className="input"
								type="text"
								placeholder="Last name input"
							/>
						</div>
					</div>
					<div className="field">
						<label className="label">Email</label>
						<div className="control">
							<input
								name="email"
								onChange={(e) => handleInput(e)}
								className="input"
								type="email"
								placeholder="Email input"
							/>
						</div>
					</div>
					<div className="field">
						<label className="label">Password</label>
						<div className="control">
							<input
								name="password"
								onChange={(e) => handleInput(e)}
								className="input"
								type="password"
								placeholder="Password"
							/>
						</div>
					</div>
					<div className="field">
						<p className="control">
							<button
								onClick={(e) => handleSubmit(e)}
								className="button is-primary is-fullwidth"
							>
								Register
							</button>
						</p>
					</div>
					<div className="field">
						<span>Already have an account? Login </span>
						<Link
							to="/login"
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
};

export default Register;
