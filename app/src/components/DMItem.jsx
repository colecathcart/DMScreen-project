import React, {useState} from "react"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const DMItem = ({data, handleRemove, index}) => {

	const item = data.rule
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
						<h4>{item.name}</h4>
						<button onClick={(e) => removeMe(e)}>X</button>
					</div>
					{item.url.match("/api/equipment/") ? 
						<div className="spellinfo">
							<i>{item.equipment_category.name}</i>
							<p><b>Cost: </b>{item.cost.quantity} {item.cost.unit}</p>
							<p><b>Weight: </b>{item.weight}</p>
							<ReactMarkdown children={item.desc.join("")}/>
						</div>
					:
						<div className="spellinfo">
							<i>{item.desc[0]}</i>
							<ReactMarkdown remarkPlugins={[remarkGfm]} children={item.desc.slice(1, item.desc.length).join("")}/>
						</div>
					}
				</div>) 
			: null}
		</div>
	)
}

export default DMItem