import React, {useState, useEffect} from "react"
import {FaSearch} from "react-icons/fa"
import { FaGear } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";
import NewItemForm from "./NewItemForm";
import axios from 'axios'

const API_URL = "http://localhost:4000/"

const Searchbar = ({settheRules}) => {

	const [input, setInput] = useState("")
	const [spells, setSpells] = useState()
	const [rules, setRules] = useState()
	const [items, setItems] = useState()
	const [tables, setTables] = useState()
	const [newitemform, setNewitemform] = useState(false)
	const [spellresults, setspellResults] = useState([])
	const [itemresults, setitemResults] = useState([])
	const [ruleresults, setruleResults] = useState([])
	const [tableresults, settableResults] = useState([])
	const [toedit, setToEdit] = useState()

	const FetchAllResults = async ()=>{
		try {
			const spellres = await axios.get("http://localhost:4000/search?url=/api/spells")
			const gruleres = await axios.get("http://localhost:4000/search?url=/api/rule-sections")
			const condres = await axios.get("http://localhost:4000/search?url=/api/conditions")
			const equipres = await axios.get("http://localhost:4000/search?url=/api/equipment")
			const mitemres = await axios.get("http://localhost:4000/search?url=/api/magic-items")
			const dmtableres = await axios.get("http://localhost:4000/gettables", {withCredentials: true})
			const dmcardres = await axios.get("http://localhost:4000/getcards", {withCredentials: true})
			setTables(dmtableres.data.concat(dmcardres.data))
			setSpells(spellres.data.results)
			setRules(gruleres.data.results.concat(condres.data.results))
			setItems(equipres.data.results.concat(mitemres.data.results))
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(()=>{
        FetchAllResults()
    },[])

	useEffect(()=>{
		if(toedit){
			setNewitemform(true)
			setInput("")
			setspellResults([])
			setruleResults([])
			setitemResults([])
			settableResults([])
		}
	},[toedit])

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
				settheRules(rule)
			} else {
				const res = await axios.get("http://localhost:4000/add?url="+rule.url)
				settheRules(res.data)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const handleDelete = async (rule) => {
		if(rule.roll){
			await axios(API_URL + "deletetable", {
				method: "delete",
				withCredentials: true,
				headers: {
					_id: rule._id
				}
			})
		} else {
			await axios(API_URL + "deletecard", {
				method: "delete",
				withCredentials: true,
				headers: {
					_id: rule._id
				}
			})
		}
		setInput("")
		setspellResults([])
		setruleResults([])
		setitemResults([])
		settableResults([])
		FetchAllResults()
	}

	return (
		<div>
			<div className="searchheader">
				<div className="searchbar">
					<FaSearch/>
					
					<input placeholder="search for an item" value={input} onChange={e => handleSearch(e.target.value)} disabled={items ? false : true}/>
				</div>
				<button className="createbutton" onClick={()=>setNewitemform(!newitemform)}>+ <i>create</i></button>
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
					{tableresults.length ? <th className="searchresult">Your Tables & Cards</th> : null}
					{tableresults.map((result, id) => {
						return <tr className="searchresult"><button key={id} onClick={() => handleRuleAdd(result)}>{result.title}</button><button className="editbtn" onClick={()=>setToEdit(result)}><FaGear/></button><button className="editbtn" onClick={()=>handleDelete(result)}><FaTrash/></button></tr>
					})}
				</tbody>
			</table>
			{ newitemform ? 
				<NewItemForm setVis = {setNewitemform} getResults = {FetchAllResults} toEdit = {toedit || {}}/>
			: null}
		</div>
	)
}

export default Searchbar