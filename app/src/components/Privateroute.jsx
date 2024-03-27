import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL
const YES = 1
const NO = 0
const WAIT = 2

const Privateroute = ({children}) => {

	const [loginstate, setLoginstate] = useState(WAIT)

	const navigate = useNavigate()

	useEffect(()=>{
		axios.get(API_URL + "verify",{withCredentials: true})
		.then((res)=>{
			console.log(res.data)
			if(res.data === "Failed") {
				setLoginstate(NO)
				navigate("/")
			}
			console.log("logged in? "+res.data)
			setLoginstate(YES)
		})
		.catch((err)=>{
			setLoginstate(NO)
			console.log(err)
		})
	})

	if(loginstate === 2) {
		return (<>Verifying</>)
	}
	if(loginstate === 0) {
		return (<>Redirecting</>)
	}
	if(loginstate === 1) {
		return children
	}

}
export default Privateroute