import React, {useState} from "react"

const DMTable = (tableData) => {

	const [vis, setVis] = useState(true)

	const removeMe = () => {
		setVis((prev) => !prev)
	}
	return (
		<div>
			{vis ? ( 
				<div className="tableContainer">
					<div className="tableHeader">
						<h4>{tableData.tableData.title}</h4>
						<button onClick={removeMe}>X</button>
					</div>
					<table className="dmbasictable">
						<tbody>
							<tr>
								<th>One</th>
								<th>Two</th>
								<th>Three</th>
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