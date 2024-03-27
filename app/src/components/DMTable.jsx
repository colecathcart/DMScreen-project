import React, {useState} from "react"

const DMTable = ({tableData: {rule, thekey}, handleRemove}) => {

	const [vis, setVis] = useState(true)
	const [rolling, setRolling] = useState(false)
	const [rollres, setRollres] = useState(-1)
	console.log(rule)
	const removeMe = () => {
		setVis((prev) => !prev)
		handleRemove(thekey)
	}

	function isRoll(roll){
		if(roll === "TRUE"){
			return true
		} else {
			return false
		}
	}

	function numWasRolled(range){
		if(range.length > 1){
			//console.log("Here")
			//console.log(range[0],range[1])
			if(range[0] <= rollres && range[1] >= rollres){
				//console.log("In range")
				return true
			}
			return false
		} else {
			//console.log("there")
			//console.log(range[0])
			if (range[0] === rollres){
				//console.log("Equals")
				return true
			}
			return false
		}
	}

	const roll = () =>{
		setRolling(true)
		let min = rule.rows[0][0][0]
		//console.log(min)
		let max = rule.rows[rule.rows.length - 1][0][rule.rows[rule.rows.length -1][0].length - 1] + 1
		//console.log(max)
		setRollres(Math.floor(Math.random() * (max - min)) + min)
	}

	const headers = []
	for (let i = 0; i < rule.headers.length; i++){
		if(i === 0){
			headers.push(<th>{isRoll(rule.roll) ? <button onClick={roll}><b>{rule.headers[i]}: </b>{rolling ? rollres : null}</button> : rule.headers[i]}</th>)
		} else {
			headers.push(<th>{rule.headers[i]}</th>)
		}
	}

	const rows = []
	for (let i = 0; i < rule.rows.length; i++){
		let row = []
		for (let j = 0; j < rule.rows[i].length; j++){
			if(j === 0 && isRoll(rule.roll) && rule.rows[i][j].length > 1){
				row.push(<td>{rule.rows[i][j][0]}-{rule.rows[i][j][1]}</td>)
			}else{
				row.push(<td>{rule.rows[i][j]}</td>)
			}
		}
		if(isRoll(rule.roll)){

			rows.push(<tr className={numWasRolled(rule.rows[i][0]) ? "rolledrow" : "tablerow"}>{row}</tr>)
		} else {
			rows.push(<tr className="tablerow">{row}</tr>)
		}
	}

	return (
		<div>
			{console.log(rule)}
			{vis ? ( 
				<div className="tableContainer">
					<div className="tableHeader">
						<h4>{rule.title}</h4>
						<button onClick={removeMe}>X</button>
					</div>
					<table className="dmbasictable">
						<tbody>
							<tr>
								{headers}
							</tr>
							{rows}
						</tbody>
					</table>
				</div>) 
			: null}
		</div>
	)
}

export default DMTable