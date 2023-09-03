import React, {useState} from "react"

const DMTable = (tableInfo) => {

	const [vis, setVis] = useState(true)

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

	return (
		<div>
			{vis ? ( 
				<div className="tableContainer">
					<div className="tableHeader">
						<h4>{tableInfo.tableData.title}</h4>
						<button onClick={removeMe}>X</button>
					</div>
					<table className="dmbasictable">
						<tbody>
							<tr>
								<th>One</th>
								<th>Two</th>
								<th>d100 {isRoll(tableInfo.tableData.roll) ? <button>roll</button> : null}</th>
							</tr>
							<tr>
								<td>blah</td>
								<td>blah</td>
								<td>blah</td>
							</tr>
							<tr>
								<td>blah</td>
								<td>blah</td>
								<td>blah</td>
							</tr>
							<tr>
								<td>blah</td>
								<td>blah</td>
								<td>blah</td>
							</tr>
						</tbody>
					</table>
				</div>) 
			: null}
		</div>
	)
}

export default DMTable