import React, {useState} from "react"
import {useNavigate} from "react-router-dom"

const Login = () => {
	const navigate = useNavigate()
	const handleNavigate = async e =>{
		e.preventDefault()
		navigate("/screen")
	}
	return (
		<button onClick={handleNavigate} name="standin">screen</button>
	)
}

export default Login