import React, {useState} from "react"
import {useNavigate} from "react-router-dom"
import DMTable from "./DMTable"

const Screen = () => {

	const [show1, setShow1] = useState(true)
	const [show2, setShow2] = useState(true)

	const navigate = useNavigate()

	const handleNavigate = async e =>{
		e.preventDefault()
		navigate("/")
	}

	return (
		<div className="App">
			<div className="header">
				<h1>DMScreen</h1>
				<button onClick={handleNavigate}>Logout</button>
			</div>
			<div className="mainArea">
				{show1 ? <div className="tableArea">
					<DMTable/>
				</div> : null}
				<div className="collapser">
					<button onClick={() => setShow1(show1 => !show1)}>{show1 ? <b>&lt;</b> : <b>&gt;</b>}</button>
				</div>
				<iframe src="https://improvedinitiative.app/" title="improved initiative"></iframe>
				<div className="collapser">
					<button onClick={() => setShow2(show2 => !show2)}>{show2 ? <b>&gt;</b> : <b>&lt;</b>}</button>
				</div>
				{show2 ? <div className="tableArea">
					
				</div> : null}
			</div>
    	</div>
	)
}

export default Screen