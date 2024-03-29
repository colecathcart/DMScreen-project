import React, {useState} from "react"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const DMSpell = ({data, handleRemove, index}) => {

	const spell = data.rule
	const key = data.thekey

	const [vis, setVis] = useState(true)

	const removeMe = (e) => {
		//e.preventDefault()
		//setVis(false)
		handleRemove(key)
	}

	return (
		<div>
			{vis ? ( 
				<div className="tableContainer">
					<div className="tableHeader">
						<h4>{spell.name}</h4>
						<button onClick={(e) => removeMe(e)}>X</button>
					</div>
					<div className="spellinfo">
						<i>{spell.level !== 0 ? "level "+spell.level : "cantrip"} {spell.school.name} {spell.ritual ? "(ritual)" : ""}</i>
						<p><b>Casting Time: </b>{spell.casting_time}</p>
						<p><b>Range: </b>{spell.range}</p>
						<p><b>Components: </b>{spell.components.map((c) => (<i>{c}  </i>))} {spell.material ? "("+spell.material+")" : ""}</p>
						<p><b>Duration: </b>{spell.duration}</p>
						<ReactMarkdown remarkPlugins={[remarkGfm]} children={spell.desc.join("")}/>
						<p>{spell.higher_level}</p>
						<i>{spell.classes.map((c) => (<i>{c.name}{c.name === spell.classes[spell.classes.length - 1].name ? null : ","} </i>))}</i>
					</div>
				</div>) 
			: null}
		</div>
	)
}

export default DMSpell