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

	const data = {
		title : "Testable",
		roll : "TRUE",
		headers : ["d10","One","Two"],
		rows : [
			[[1,5], "r1c2", "The quick brown fox jumps over the lazy dog"],
			[[6,9], "r2c2", "Once upon a time in a land far far away"],
			[[10], "r3c2", "Rocks fall. Each party member takes 100d10 damage"]
		]
	};
	console.log(data)



	return (
		<div className="App">
			<div className="header">
				<h1>DMScreen</h1>
				<button onClick={handleNavigate}>Logout</button>
			</div>
			<div className="mainArea">
				{show1 ? 
					show2 ? 
						<div className="tableArea">
							<DMTable tableData = {data}/>
						</div>
					:
						<div className="bigtableArea">
							<DMTable tableData = {data}/>
						</div>
				: null}
				<div className="collapser">
					<button onClick={() => setShow1(show1 => !show1)}>{show1 ? <b>&lt;</b> : <b>&gt;</b>}</button>
				</div>
				<div className="iframediv">
					<div className="tabbar">
						<button>test</button>
						<button>test2</button>
					</div>
					<iframe src="https://improvedinitiative.app/" title="improved initiative"></iframe>
				</div>
				<div className="collapser">
					<button className="collapsebtnright" onClick={() => setShow2(show2 => !show2)}>{show2 ? <b>&gt;</b> : <b>&lt;</b>}</button>
				</div>
				{show2 ? 
					show1 ?
						<div className="tableArea">
							<DMTable tableData = {data}/>
						</div> 
					:
						<div className="bigtableArea">
							<DMTable tableData = {data}/>
						</div>
				: null}
			</div>
    	</div>
	)
}

export default Screen