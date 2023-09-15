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
						<i>{spell.info.metadata}</i>
						<p><b>Range: </b>{spell.info.range}</p>
						<p><b>Casting Time: </b>{spell.info.casttime}</p>
						<p><b>Components: </b>{spell.info.components}</p>
						<p>{spell.info.description}</p>
					</div>
				</div>) 
			: null}
		</div>
	)
}

export default DMSpell