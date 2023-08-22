import React, {useState} from "react"

const DMTable = () => {
	return (
		<div className="tableContainer">
			<div className="tableHeader">
				<h4>Tname</h4>
				<button>X</button>
			</div>
			<table className="dmbasictable">
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
			</table>
		</div>
	)
}

export default DMTable