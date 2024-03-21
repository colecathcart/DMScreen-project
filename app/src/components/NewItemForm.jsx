import React, {useEffect, useState} from "react"
import axios from 'axios'

const API_URL = "http://localhost:4000/"

const NewItemForm = ({setVis, getResults}) => {

	const [showcard, setShowcard] = useState(true)
	const [error, setError] = useState("")
	const [maxrows, setMaxrows] = useState(30)
	const [tooltip, setTooltip] = useState(false)
	const [autofill, setAutofill] = useState(false)
	const [dmtable, setDmtable]  = useState({
		title: "",
		roll: "FALSE",
		headers: [""],
		rows: [[""]]
	})
	const [card, setCard] = useState({
		name: "",
		desc: ""
	})

	useEffect(()=>{
		if(dmtable.roll === "TRUE"){
			console.log("here")
			fillRollColumn(parseInt(dmtable.headers[0].substring(1)))
		}
	},[dmtable.rows.length])

	useEffect(()=>{
		setError("")
		setDmtable({
			title: "",
			roll: "FALSE",
			headers: [""],
			rows: [[""]]
		})
	},[showcard])

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
		if(!autofill){
			return
		}
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
			newrows[newrows.length - 1][0] = count.toString()
		} else {
			newrows[newrows.length - 1][0] = count.toString() + "-" + num.toString()
		}
		setDmtable({
			...dmtable,
			rows: newrows
		})
	}

	const handleClose = (e) => {
		e.preventDefault()
		setVis(false)
	}

	const handleCardSubmit = async (e) => {
		e.preventDefault()
		const cardname = card.name.trim()
		const carddesc = card.desc.trim()
		if(cardname.length > 30){
			setError("Name cannot exceed 30 characters!")
			setCard({
				...card,
				name: ""
			})
		} else if(cardname.length < 1 || carddesc.length < 1){
			setError("Fields cannot be blank!")
		} else {
			setError("")
			const newcard = {
				title: cardname,
				desc: carddesc
			}
			try {
				await axios( API_URL + "newcard", {
					method: "post",
					withCredentials: true,
					data: newcard
				})
			} catch (err){
				console.log(err)
			}
			getResults()	
			setVis(false)
		}
	}

	const handleTableSubmit = async (e) => {
		e.preventDefault()
		console.log(dmtable)
		const dmt = JSON.parse(JSON.stringify(dmtable))
		dmt.title = dmt.title.trim()
		let nooverflow = true
		let noblanks = true
		dmt.headers.forEach(header => {
			header = header.trim()
			if(header.length < 1){
				noblanks = false
			}
			if(header.length > 30){
				nooverflow = false
			}
		})
		if(!nooverflow){
			setError("Headers cannot exceed 30 characters!")
			return
		}
		dmt.rows.forEach((row)=>{
			row.forEach((element)=>{
				console.log(typeof(element))
				console.log(element)
				element = element.trim()
				if(element.length < 1){
					noblanks = false
				}
			})
		})
		if(!noblanks) {
			setError("Fields cannot be blank!")
			return
		}
		if(dmt.title.length > 30){
			setError("Title cannot exceed 30 characters!")
			return
		}
		if(dmt.title.length < 1){
			setError("Fields cannot be blank!")
			return
		}
		if(dmt.roll === "TRUE"){
			let sumofrolls = 0
			for(let i = 0; i < dmt.rows.length; i++){
				let row = dmt.rows[i]
				let check1 = row[0].trim().match(/^[0-9]+-[0-9]+$/)
				let check2 = row[0].trim().match(/^\d+$/)
				console.log(check1)
				console.log(check2)
				if(!check1 && !check2){
					if(!check2)
					setError("Roll column has bad values! Ensure all entries are digits formatted as 'n' or 'n-m'")
					return
				}
				if(check1){
					let strarr = check1[0].split("-")
					let numarr = []
					strarr.forEach((str)=>{numarr.push(parseInt(str))})
					row[0] = numarr
					if(row[0][0] === 0 || row[0][1] === 0){
						setError("Roll column cannot contain zeroes!")
						return
					}
					let startroll = row[0][0]
					console.log(startroll)
					console.log(typeof(row[0][1]))
					while(startroll <= row[0][1]){
						sumofrolls += startroll
						startroll += 1
					}
				}else if(check2){
					row[0] = [parseInt(check2[0])]
					if(row[0][0] === 0){
						setError("Roll column cannot contain zeroes!")
						return
					}
					sumofrolls += row[0][0]
				}
			}
			let dicenum = parseInt(dmt.headers[0].substring(1))
			if(sumofrolls !== (dicenum*(dicenum + 1))/2){
				setError("Roll column does not contain a valid spread of rolls! Ensure no duplicate or out-of-bounds numbers")
				return
			}
		}
		setError("")
		console.log(dmt)
		try {
			await axios( API_URL + "newtable", {
				method: "post",
				withCredentials: true,
				data: dmt
			})
		} catch (err){
			console.log(err)
		}
		getResults()
		setVis(false)
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
					<p className="errormsg">{error}</p>
					<label>Name</label>
					<input type="text" placeholder="max 30 characters" value={card.name} onChange={(e)=>setCard({...card, name: e.target.value})}></input>
					<label>Description</label>
					<textarea className="itemdesc" placeholder="" value={card.desc} onChange={(e)=>setCard({...card, desc: e.target.value})}></textarea>
					<div className="itemsubmitbtns">
						<button className="subbtn" onClick={handleCardSubmit}>Submit</button>
						<button onClick={handleClose}>X</button>
					</div>
				</form>
			:
				<form className="newitem">
					<p className="errormsg">{error}</p>
					<div className="titlelabel">
						<label>Title</label>
						<input type="text" placeholder="max 30 characters" value={dmtable.title} onChange={(e)=>setDmtable({...dmtable, title: e.target.value})}></input>
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
								are not allowed in this column.</span> : null
						}
						<input type="checkbox" value={autofill} onChange={(e)=>setAutofill(e.target.value)}></input>
						<label className="checklabel">auto-fill roll column</label>
					</div>
					<div className="coldiv">
						<label className="headers">Headers</label>
						<div className="colwithbtn">
							{dmtable.headers.map((header, id)=>{
								return <textarea className="headertext" wrap="off" value={header} placeholder={"max 30 characters"} disabled={id === 0 && dmtable.roll === "TRUE"} onChange={(e)=>setDmtable({
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
															if(i === idi){
																row[idj] = e.target.value.toString()
															}
															return row
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
						<button className="subbtn" onClick={handleTableSubmit}>Submit</button>
						<button onClick={handleClose}>X</button>
					</div>
				</form>
			}
		</div>
	)
}
export default NewItemForm