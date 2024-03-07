import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import { FaDiceD20 } from "react-icons/fa"
import axios from "axios"

const API_URL = "http://localhost:4000/"

const Login = () => {

	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")

	const [newuname, setNewuname] = useState("")
	const [newpword, setNewpword] = useState("")
	const [newaccerror, setNewaccerror] = useState("")

	useEffect(() =>{
		setError("")
	}, [username, password])

	useEffect(() =>{
		setNewaccerror("")
	}, [newuname, newpword])

	const navigate = useNavigate()

	const handleNavigate = async e =>{
		e.preventDefault()
		navigate("/screen")
	}

	const login = async (e) => {
		e.preventDefault()
		if (!username || !password){
			setError("Please enter your login details")
		} else {
			try {
				const res = await axios.get(API_URL + "login",{
					params: {
						username: username,
						password: password
					}
				})
				if(res.data.length === 0){
					setError("No users matching those credentials!")
				} else {
					console.log(res.data)
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
		} else {
			try {
				const res = await axios.post(API_URL + "create",{
					username: newuname,
					password: newpword
				})
				if(res.data.length === 0){
					setNewaccerror("Username already taken!")
				} else {
					console.log(res.data)
				}
			} catch(err) {
				console.log(err)
			}
		}
	}

	return (
		<div>
			<FaDiceD20 size={42}/>
			<h1>DMScreen</h1>
			<div>
				<h1>Login</h1>
				<p>{error}</p>
				<form onSubmit={login}>
					<label>Username
						<input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
					</label>
					<label>Password
						<input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
					</label>
					<input type="submit"/>
				</form>
			</div>
			<div>
			<h1>Create Account</h1>
				<p>{newaccerror}</p>
				<form onSubmit={createAccount}>
					<label>Username
						<input type="text" value={newuname} onChange={(e) => setNewuname(e.target.value)}/>
					</label>
					<label>Password
						<input type="password" value={newpword} onChange={(e) => setNewpword(e.target.value)}/>
					</label>
					<input type="submit"/>
				</form>
			</div>
			<button onClick={handleNavigate} name="standin">screen</button>
		</div>
	)
}

export default Login