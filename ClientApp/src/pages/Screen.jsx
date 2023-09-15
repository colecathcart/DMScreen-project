import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import DMTable from "./DMTable"
import DMSpell from "./DMSpell"

const Screen = () => {

	const [show1, setShow1] = useState(true)
	const [show2, setShow2] = useState(true)
	const [getspell, setGetSpell] = useState([])

	useEffect(() => {
		fetch(`spell/${"acid-arrow"}`)
			.then((results)=> {
				return results.json();
			})
			.then(data => {
				setGetSpell(data);
			})
	},[])

	console.log(getspell.name)

	const navigate = useNavigate()

	const handleNavigate = async e =>{
		e.preventDefault()
		navigate("/")
	}

	const tableexample1 = {
		title : "Random Table",
		roll : "TRUE",
		headers : ["d10","One","Two"],
		rows : [
			[[1,5], "r1c2", "The quick brown fox jumps over the lazy dog"],
			[[6,9], "r2c2", "Once upon a time in a land far far away"],
			[[10], "r3c2", "Rocks fall. Each party member takes 100d10 damage"]
		]
	};

	const tableexample2 = {
		title : "Magic Item Loot",
		roll : "TRUE",
		headers : ["d6","Loot"],
		rows : [
			[[1],"Magic Sword"],
			[[2],"Magic Armor"],
			[[3],"Bag of Holding"],
			[[4],"Potion of Healing"],
			[[5],"Staff of Fireballs"],
			[[6],"Amulet of Evil"]
		]
	};





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
							<DMTable tableData = {tableexample1}/>
							<DMSpell info = {getspell}/>
						</div>
					:
						<div className="bigtableArea">
							<DMTable tableData = {tableexample1}/>
							<DMSpell info = {getspell}/>
						</div>
				: null}
				<div className="collapser">
					<button onClick={() => setShow1(show1 => !show1)}>{show1 ? <b>&lt;</b> : <b>&gt;</b>}</button>
				</div>
				<div className="iframediv">
					<div className="tabbar">
						<button>tab1</button>
						<button>tab2</button>
					</div>
					<iframe src="https://improvedinitiative.app/" title="improved initiative"></iframe>
				</div>
				<div className="collapser">
					<button className="collapsebtnright" onClick={() => setShow2(show2 => !show2)}>{show2 ? <b>&gt;</b> : <b>&lt;</b>}</button>
				</div>
				{show2 ? 
					show1 ?
						<div className="tableArea">
							<DMTable tableData = {tableexample2}/>
						</div> 
					:
						<div className="bigtableArea">
							<DMTable tableData = {tableexample2}/>
						</div>
				: null}
			</div>
    	</div>
	)
}

export default Screen