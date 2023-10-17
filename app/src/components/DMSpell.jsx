import React, {useState} from "react"

const DMSpell = ({spell}) => {

	const [vis, setVis] = useState(true)

	const removeMe = () => {
		setVis((prev) => !prev)
	}

	return (
		<div>{console.log(spell.name)}
			{vis ? ( 
				<div className="tableContainer">
					<div className="tableHeader">
						<h4>{spell.name}</h4>
						<button onClick={removeMe}>X</button>
					</div>
					<div className="spellinfo">
						<i>{spell.level === "0" ? "level "+spell.level : "cantrip"} {spell.school.name} {spell.ritual ? "(ritual)" : ""}</i>
						<p><b>Casting Time: </b>{spell.casting_time}</p>
						<p><b>Range: </b>{spell.range}</p>
						<p><b>Components: </b>{spell.components.map((c) => (<i>{c} </i>))}, {spell.material}</p>
						<p><b>Duration: </b>{spell.duration}</p>
						{spell.desc.map((p) => (<p>{p}</p>))}
						<p>{spell.higher_level}</p>
						<i>{spell.classes.map((c) => (<i>{c.name} </i>))}</i>
					</div>
				</div>) 
			: null}
		</div>
	)
}

export default DMSpell