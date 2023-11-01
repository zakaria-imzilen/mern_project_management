import React, { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/Auth.css";
import UserContext from "../context/user";
import useTokenLogin from "../hooks/tokenLogin";

const Auth = () => {
	const [emailIn, setEmailIn] = useState("");
	const [emailUp, setEmailUp] = useState("");
	const [pwdIn, setPwdIn] = useState("");
	const [pwdUp, setPwdUp] = useState("");
	const [nameUp, setNameUp] = useState("");

	const navigate = useNavigate();

	const user = useContext(UserContext);

	// Retrieve the access token from LocalStorage
	// One time
	useTokenLogin();

	const handleSignIn = useCallback(
		(e) => {
			e.preventDefault();

			fetch("http://localhost:4000/auth/signin", {
				headers: {
					"Content-Type": "application/json",
					origin: "*",
				},
				method: "POST",
				body: JSON.stringify({
					email: emailIn,
					pwd: pwdIn,
				}),
			})
				.then((resp) => resp.json())
				.then((data) => {
					if (data?.access_token) {
						// Storing the Access token in LocalStorage
						localStorage.setItem("access_token", data.access_token);
						console.log(data.message);

						user.setUser((prev) => ({
							...prev,
							isConnected: true,
							data: data.data,
						}));

						navigate("/home");
					} else {
						console.log(data.message);
					}
				})
				.catch((err) => console.log(err));
		},
		[emailIn, pwdIn]
	);

	return (
		<div className="container" id="container">
			<div className="form-container sign-up-container">
				<form action="#">
					<h1>Create Account</h1>
					<span>or use your email for registration</span>
					<input
						value={nameUp}
						onChange={({ target }) => setNameUp(target.value)}
						type="text"
						placeholder="Name"
					/>
					<input
						value={emailUp}
						onChange={({ target }) => setEmailUp(target.value)}
						type="email"
						placeholder="Email"
					/>
					<input
						value={pwdUp}
						onChange={({ target }) => setPwdUp(target.value)}
						type="password"
						placeholder="Password"
					/>
					<button type="submit">Sign Up</button>
				</form>
			</div>
			<div className="form-container sign-in-container">
				<form onSubmit={handleSignIn} action="https://www.facebook.com">
					<h1>Sign in</h1>
					<span>or use your account</span>
					<input
						onChange={({ target }) => setEmailIn(target.value)}
						value={emailIn}
						type="email"
						placeholder="Email"
					/>
					<input
						onChange={({ target }) => setPwdIn(target.value)}
						value={pwdIn}
						type="password"
						placeholder="Password"
					/>
					<a href="#">Forgot your password?</a>
					<button type="submit">Sign In</button>
				</form>
			</div>
			<div className="overlay-container">
				<div className="overlay">
					<div className="overlay-panel overlay-left">
						<h1>Welcome Back!</h1>
						<p>
							To keep connected with us please login with your personal info
						</p>
						<button
							onClick={() => {
								const container = document.getElementById("container");

								container.classList.remove("right-panel-active");
							}}
							className="ghost"
							id="signIn"
						>
							Sign In
						</button>
					</div>
					<div className="overlay-panel overlay-right">
						<h1>Hello, Friend!</h1>
						<p>Enter your personal details and start journey with us</p>
						<button
							onClick={() => {
								const container = document.getElementById("container");

								container.classList.add("right-panel-active");
							}}
							className="ghost"
							id="signUp"
						>
							Sign Up
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Auth;
