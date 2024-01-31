import React, {useState, useEffect} from "react"
import {FaSearch} from "react-icons/fa"
import axios from 'axios'
const Searchbar = ({settheRules}) => {

	const [input, setInput] = useState("")
	const [spells, setSpells] = useState()
	const [rules, setRules] = useState()
	const [items, setItems] = useState()
	const [tables, setTables] = useState()
	const [spellresults, setspellResults] = useState([])
	const [itemresults, setitemResults] = useState([])
	const [ruleresults, setruleResults] = useState([])
	const [tableresults, settableResults] = useState([])

	useEffect(()=>{
        const FetchAllResults = async ()=>{
            try {
                const spellres = await axios.get("http://localhost:4000/search?url=/api/spells")
				const gruleres = await axios.get("http://localhost:4000/search?url=/api/rule-sections")
				const condres = await axios.get("http://localhost:4000/search?url=/api/conditions")
				const equipres = await axios.get("http://localhost:4000/search?url=/api/equipment")
				const mitemres = await axios.get("http://localhost:4000/search?url=/api/magic-items")
				const dmtableres = await axios.get("http://localhost:4000/gettables")
				setTables(dmtableres.data)
                setSpells(spellres.data.results)
				setRules(gruleres.data.results.concat(condres.data.results))
				setItems(equipres.data.results.concat(mitemres.data.results))
            } catch (error) {
                console.log(error)
            }
        }
        FetchAllResults()
    },[])

	const handleSearch = (value) => {
		setInput(value)
		const spellres = spells.filter((item) => {
			return value && item && item.name && item.name.toLowerCase().includes(value)
		})
		const itemres = items.filter((item) => {
			return value && item && item.name && item.name.toLowerCase().includes(value)
		})
		const ruleres = rules.filter((item) => {
			return value && item && item.name && item.name.toLowerCase().includes(value)
		})
		const tableres = tables.filter((item) => {
			return value && item && item.title && item.title.toLowerCase().includes(value)
		})
		settableResults(tableres.slice(0,5))
		setspellResults(spellres.slice(0,5))
		setitemResults(itemres.slice(0,5))
		setruleResults(ruleres.slice(0,5))
		//console.log(results)
	}

	const handleRuleAdd = async (rule) => {
		try {
			setInput("")
			setspellResults([])
			setruleResults([])
			setitemResults([])
			settableResults([])
			if(rule.title){
				console.log("HEYEYEYEY")
				settheRules(rule)
			} else {
				const res = await axios.get("http://localhost:4000/add?url="+rule.url)
				settheRules(res.data)
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div>
			<div className="searchbar">
				<FaSearch/>
				
				<input placeholder="add a new item" value={input} onChange={e => handleSearch(e.target.value)}/>
			</div>
			<table className="searchresults">
				<tbody>
					{spellresults.length ? <th className="searchresult">Spells</th> : null}
					{spellresults.map((result, id) => {
						return <tr className="searchresult"><button key={id} onClick={() => handleRuleAdd(result)}>{result.name}</button></tr>
					})}
					{itemresults.length ? <th className="searchresult">Items</th> : null}
					{itemresults.map((result, id) => {
						return <tr className="searchresult"><button key={id} onClick={() => handleRuleAdd(result)}>{result.name}</button></tr>
					})}
					{ruleresults.length ? <th className="searchresult">Rules</th> : null}
					{ruleresults.map((result, id) => {
						return <tr className="searchresult"><button key={id} onClick={() => handleRuleAdd(result)}>{result.name}</button></tr>
					})}
					{tableresults.length ? <th className="searchresult">Your Tables</th> : null}
					{tableresults.map((result, id) => {
						return <tr className="searchresult"><button key={id} onClick={() => handleRuleAdd(result)}>{result.title}</button></tr>
					})}
				</tbody>
			</table>
		</div>
	)
}

export default Searchbar