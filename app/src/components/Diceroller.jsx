import React, {useEffect, useState} from "react"

const Diceroller = ({display}) => {

	const [die, setDie] = useState(4)
	const [mod, setMod] = useState(0)
	const [result, setResult] = useState(0)
	const [rolling, setRolling] = useState(false)
	const [rolls, setRolls] = useState([1])

	useEffect(()=>{
		setRolls(Array(rolls.length).fill(1))
	},[die])

	const addDice = (e) => {
		e.preventDefault()
		setRolls([...rolls, 1])
	}

	const removeDice = (e) => {
		e.preventDefault()
		let newrolls = [...rolls]
		newrolls.pop()
		setRolls(newrolls)
	}

	const rollDice = (e) => {
		e.preventDefault()
		setRolling(true)
		let sum = 0
		let newrolls = Array(rolls.length).fill(0)
		console.log(newrolls)
		newrolls.forEach((roll, i) => {
			newrolls[i] = Math.floor(Math.random() * die) + 1
			sum += newrolls[i]
		})
		console.log(newrolls)
		setRolls(newrolls)
		setResult(sum + parseInt(mod))
	}

	return(
		
		<div className="diceroller" style={display ? {display: "flex"} : {display: "none"}}>
			<div className="dicebox">
				{rolls.map((roll, id)=>{
					return <div className={"d" + die.toString()} style={rolling ? {animation: "rotation .2s linear"} : {}} onAnimationEnd={()=>setRolling(false)}>{roll}</div>
				})}
			</div>
			<div className="rollmenu">
				<button className="plusbtn" onClick={addDice} disabled={rolls.length > 19}>+</button>
				<button className="plusbtn" onClick={removeDice} disabled={rolls.length < 2}>-</button>
				<p>{rolls.length}</p>
				<select value={die} onChange={(e)=>setDie(e.target.value)}>
					<option value={4} selected>d4</option>
					<option value={6}>d6</option>
					<option value={8}>d8</option>
					<option value={10}>d10</option>
					<option value={12}>d12</option>
					<option value={20}>d20</option>
					<option value={100}>d100</option>
				</select>
				<label>{"+ "}
					<input type="number" value={mod} onChange={(e)=>setMod(e.target.value)}></input>
				</label>
				<button className="dicerollbtn" onClick={rollDice}>Roll!</button>
				<p style={{width: "6ch"}}>= {result}</p>
			</div>
		</div>
	)
}
export default Diceroller