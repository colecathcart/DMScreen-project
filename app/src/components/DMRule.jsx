import React, {useState} from "react"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const DMRule = ({data, handleRemove, index}) => {

	const rule = data.rule
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
						<h4>{rule.name}</h4>
						<button onClick={(e) => removeMe(e)}>X</button>
					</div>
					<div className="spellinfo">
						{rule.url.match("/api/conditions") ? 
							<ReactMarkdown remarkPlugins={[remarkGfm]} children={rule.desc.join("")}/>
						:
							<ReactMarkdown remarkPlugins={[remarkGfm]} children={rule.desc}/>}
					</div>
				</div>) 
			: null}
		</div>
	)
}

export default DMRule