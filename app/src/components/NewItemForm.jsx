import React, {useEffect, useState} from "react"

const NewItemForm = () => {

	const [showcard, setShowcard] = useState(true)
	const [error, setError] = useState("")
	const [maxrows, setMaxrows] = useState(30)
	const [tooltip, setTooltip] = useState(false)
	const [dmtable, setDmtable]  =useState({
		title: "",
		roll: "FALSE",
		headers: [""],
		rows: [[""]]
	})

	useEffect(()=>{
		if(dmtable.roll === "TRUE"){
			console.log("here")
			fillRollColumn(parseInt(dmtable.headers[0].substring(1)))
		}
	},[dmtable.rows])

	const addNewcolumn = (e) =>{
		e.preventDefault()
		let newrows = dmtable.rows
		newrows.forEach(row => {
			row.push("")
		})
		setDmtable({
			...dmtable,
			headers: [...dmtable.headers,""],
			rows: newrows
		})
	}

	const deleteColumn = (e) =>{
		e.preventDefault()
		let newrows = dmtable.rows
		let newheaders = dmtable.headers
		newheaders.pop()
		newrows.forEach(row => {
			row.pop()
		})
		setDmtable({
			...dmtable,
			headers: newheaders,
			rows: newrows
		})
	}

	const deleteRow = (e) =>{
		e.preventDefault()
		let newrows = dmtable.rows
		newrows.pop()
		setDmtable({
			...dmtable,
			rows: newrows
		})
		if(dmtable.roll === "TRUE"){
			fillRollColumn(parseInt(dmtable.headers[0].substring(1)))
		}
	}

	const addNewrow = (e) =>{
		e.preventDefault()
		let newrow = []
		dmtable.headers.forEach(()=>{
			newrow.push("")
		})
		setDmtable({
			...dmtable,
			rows: [...dmtable.rows,newrow]
		})
	}

	const handleRollinfo = (rollinfo) =>{
		if(rollinfo === ""){
			setMaxrows(30)
		} else if(rollinfo === "d100"){
			setMaxrows(30)
			fillRollColumn(100)
		} else {
			const newmr = parseInt(rollinfo.substring(1))
			setMaxrows(newmr)
			if(dmtable.rows.length > newmr){
				const newrows = dmtable.rows
				newrows.length = newmr
				setDmtable({
					...dmtable,
					rows: newrows
				})
			}
			fillRollColumn(newmr)
		}
		const newheaders = dmtable.headers
		newheaders[0] = rollinfo
		setDmtable({
			...dmtable,
			roll: rollinfo === "" ? "FALSE" : "TRUE",
			headers: newheaders
		})
	}

	const fillRollColumn = (num) =>{
		const numsperrow = Math.floor(num / dmtable.rows.length)
		const newrows = dmtable.rows
		let count = 1
		for(let i = 0; i < newrows.length - 1; i++){
			if(count === count + numsperrow - 1){
				newrows[i][0] = count.toString()
			} else {
				newrows[i][0] = count.toString() + "-" + (count + numsperrow - 1).toString()
			}
			count += numsperrow
		}
		if(count === num){
			newrows[newrows.length - 1][0] = count
		} else {
			newrows[newrows.length - 1][0] = count.toString() + "-" + num.toString()
		}
		setDmtable({
			...dmtable,
			rows: newrows
		})
	}

	return (
		<div className="newitemform">
			<form>
				<label>Card
					<input type="radio" name="showcard" defaultChecked onClick={()=>setShowcard(true)}></input>
				</label>
				<label>Table
					<input type="radio" name="showcard" onClick={()=>setShowcard(false)}></input>
				</label>
			</form>
			{showcard ? 
				<form className="newitem">
					<p>{error}</p>
					<label>Name</label>
					<input type="text" placeholder="max 30 characters"></input>
					<label>Description</label>
					<textarea className="itemdesc" placeholder=""></textarea>
					<div className="itemsubmitbtns">
						<button className="subbtn">Submit</button>
						<button>X</button>
					</div>
				</form>
			:
				<form className="newitem">
					<div className="titlelabel">
						<label>Title</label>
						<input type="text" placeholder="max 30 characters"></input>
					</div>
					<div className="rollable">
						<label>Rollable?
							<select value={dmtable.headers[0]} onChange={(e)=>handleRollinfo(e.target.value)}>
								<option value ="">No</option>
								<option value ="d2">d2</option>
								<option value="d4">d4</option>
								<option value="d6">d6</option>
								<option value="d8">d8</option>
								<option value="d10">d10</option>
								<option value="d12">d12</option>
								<option value="d20">d20</option>
								<option value="d100">d100</option>
							</select>
						</label>
						<div className="tooltip" onMouseOver={()=>setTooltip(true)} onMouseOut={()=>setTooltip(false)}>?</div>
						{tooltip ? <span className="tooltipdesc">When table is rollable, the entire first column must contain 
								the spread of rolls from 1 to the maximum of the chosen die. If one row corresponds to a range of values,
								they must be inputted as 'n-m'. Duplicate numbers and numbers outside the die's range 
								are not allowed in this column.</span> : null}
					</div>
					<div className="coldiv">
						<label className="headers">Headers</label>
						<div className="colwithbtn">
							{dmtable.headers.map((header, id)=>{
								return <textarea value={header} disabled={id === 0 && dmtable.roll === "TRUE"} onChange={(e)=>setDmtable({
									...dmtable, headers: dmtable.headers.map((item,i)=>{
										return i ===id ? e.target.value : item})
									})
								}></textarea>
							})}
							<button onClick={addNewcolumn} disabled={dmtable.headers.length > 4}>+</button>
							<button onClick={deleteColumn} disabled={dmtable.headers.length < 2}>-</button>
						</div>
					</div>
					<div className="rowdiv">
						<label>Rows</label>
							<div>
								{dmtable.rows.map((row, idi)=>{
									return(
										<div>
											{row.map((item, idj)=>{
												return <textarea value={item} placeholder={dmtable.roll === "TRUE" && idj === 0 ? "n-m" : ""} onChange={(e)=>{
													setDmtable({
														...dmtable, rows: dmtable.rows.map((row,i)=>{
															return i === idi ? row.map((cell,j)=>{
																return j === idj ? e.target.value : cell
															}) : row
														})
													})
												}}></textarea>
											})}
										</div>
									)
								})}
							</div>
					</div>
					<div className="rowbtns">
						<button onClick={addNewrow} disabled={dmtable.rows.length === maxrows}>+</button>
						<button onClick={deleteRow} disabled={dmtable.rows.length < 2}>-</button>
					</div>
					<div className="itemsubmitbtns">
						<button className="subbtn">Submit</button>
						<button>X</button>
					</div>
				</form>
			}
		</div>
	)
}
export default NewItemForm