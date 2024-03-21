import React, {useState} from "react"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const DMCard = ({data: {rule, thekey}, handleRemove, index}) => {
	const card = rule
	const key = thekey

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
						<h4>{card.title}</h4>
						<button onClick={(e) => removeMe(e)}>X</button>
					</div>
					<div className="spellinfo">
						<ReactMarkdown remarkPlugins={[remarkGfm]} children={card.description}/>
					</div>
				</div>) 
			: null}
		</div>
	)
}

export default DMCard