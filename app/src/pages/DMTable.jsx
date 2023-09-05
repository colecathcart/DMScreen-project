import React, {useState} from "react"

const DMTable = (tI) => {

	const [vis, setVis] = useState(true)
	const [rollres, setRollres] = useState(-1)

	const removeMe = () => {
		setVis((prev) => !prev)
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
			if(range[0] <= rollres && range[1] >= rollres){
				return true
			}
			return false
		} else {
			if (range === rollres){
				return true
			}
			return false
		}
	}

	const roll = () =>{
		setRollres(7)
	}

	const headers = []
	for (let i = 0; i < tI.tableData.headers.length; i++){
		if(i === 0){
			headers.push(<th>{tI.tableData.headers[i]}{isRoll(tI.tableData.roll) ? <button onClick={roll}>roll</button> : null}</th>)
		} else {
			headers.push(<th>{tI.tableData.headers[i]}</th>)
		}
	}

	const rows = []
	for (let i = 0; i < tI.tableData.rows.length; i++){
		let row = []
		for (let j = 0; j < tI.tableData.rows[i].length; j++){
			if(j === 0 && isRoll(tI.tableData.roll) && tI.tableData.rows[i][j].length > 1){
				row.push(<td>{tI.tableData.rows[i][j][0]}-{tI.tableData.rows[i][j][1]}</td>)
			}else{
				row.push(<td>{tI.tableData.rows[i][j]}</td>)
			}
		}
		if(isRoll(tI.tableData.roll)){
			rows.push(<tr className={numWasRolled(tI.tableData.rows[i][0]) ? "rolledrow" : "tablerow"}>{row}</tr>)
		} else {
			rows.push(<tr className="tablerow">{row}</tr>)
		}
	}

	return (
		<div>
			{vis ? ( 
				<div className="tableContainer">
					<div className="tableHeader">
						<h4>{tI.tableData.title}</h4>
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