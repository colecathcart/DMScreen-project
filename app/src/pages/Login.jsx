import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import { FaDiceD20 } from "react-icons/fa"
import axios from "axios"
import Cookies from "js-cookie"

const API_URL = "http://localhost:4000/"

const Login = () => {

	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")

	const [newuname, setNewuname] = useState("")
	const [newpword, setNewpword] = useState("")
	const [newaccerror, setNewaccerror] = useState("")

	const [showcreate, setShowcreate] = useState(false)
	const [success, setSuccess] = useState("")

	const navigate = useNavigate()

	const handleNavigate = async =>{
		navigate("/screen")
	}

	const login = async (e) => {
		e.preventDefault()
		if (!username || !password){
			setError("Please enter your login details")
		} else {
			try {
				const res = await axios.get(API_URL + "login",{
					withCredentials: true,
					headers: {
						username: username,
						password: password
					}
				})
				if(res.data.length === 0){
					setUsername("")
					setPassword("")
					setError("No users matching those credentials!")
				} else {
					console.log(res.data)
					Cookies.set('username', username, {sameSite: 'strict'})
					setUsername("")
					setPassword("")
					handleNavigate()
				}
			} catch(err) {
				console.log(err)
			}
		}

	}

	const createAccount = async (e) => {
		e.preventDefault()
		if (!newuname || !newpword){
			setNewaccerror("A username & password is required!")
			setNewuname("")
			setNewpword("")
		} else {
			try {
				const res = await axios.post(API_URL + "create",{
					username: newuname,
					password: newpword
				})
				if(res.data.length === 0){
					setNewaccerror("Username already taken!")
					setNewuname("")
					setNewpword("")
				} else {
					console.log(res.data)
					setSuccess("Account created!")
					setNewuname("")
					setNewpword("")
					setShowcreate(false)
				}
			} catch(err) {
				console.log(err)
			}
		}
	}

	return (
		<div className="loginbackground">
			<div className="loginscreen">
			<div>
				<FaDiceD20 size={200}/>
				<h1 className="logoname">DMScreen</h1>
			</div>
			{!showcreate ? 
				<div className="form">
					<h1>Login</h1>
					<p className="errormsg">{error}</p>
					<p className="successmsg">{success}</p>
					<form onSubmit={login} onFocus={() => {setError(""); setSuccess("")}}>
						<label>Username
							<input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
						</label>
						<label>Password
							<input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
						</label>
						<input type="submit"/>
						<button onClick={() => setShowcreate(true)}>Create Account</button>
					</form>
				</div>
			: 
				<div className="form">
				<h1>Create Account</h1>
					<p className="errormsg">{newaccerror}</p>
					<form onSubmit={createAccount} onFocus={() => {setNewaccerror("")}}>
						<label>Username
							<input type="text" value={newuname} onChange={(e) => setNewuname(e.target.value)}/>
						</label>
						<label>Password
							<input type="password" value={newpword} onChange={(e) => setNewpword(e.target.value)}/>
						</label>
						<input type="submit"/>
					</form>
				</div>
			}
			</div>
		</div>
	)
}

export default Login