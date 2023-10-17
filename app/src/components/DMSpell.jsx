import React, {useState} from "react"

const DMSpell = (spell) => {

	const [vis, setVis] = useState(true)

	const removeMe = () => {
		setVis((prev) => !prev)
	}

	return (
		<div>
			{vis ? ( 
				<div className="tableContainer">
					<div className="tableHeader">
						<h4>{spell.info.name}</h4>
						<button onClick={removeMe}>X</button>
					</div>
					<div className="spellinfo">
						<i>level {spell.info.level} {spell.info.school.name}</i>
						<p><b>Casting Time: </b>{spell.info.casting_time}</p>
						<p><b>Range: </b>{spell.info.range}</p>
						<p><b>Components: </b>{spell.info.components.map((c) => (<i>{c} </i>))}, {spell.info.material}</p>
						<p><b>Duration: </b>{spell.info.duration}</p>
						<p>{spell.info.desc}</p>
						<p>{spell.info.higher_level}</p>
						<i>{spell.info.classes.map((c) => (<i>{c.name} </i>))}</i>
					</div>
				</div>) 
			: null}
		</div>
	)
}

export default DMSpell