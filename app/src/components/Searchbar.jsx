import React, {useState, useEffect} from "react"
import {FaSearch} from "react-icons/fa"
import axios from 'axios'
const Searchbar = (stuff) => {

	const [input, setInput] = useState("")
	const [spells, setSpells] = useState()
	const [results, setResults] = useState([])

	useEffect(()=>{
        const FetchAllSpells = async ()=>{
            try {
                const res = await axios.get("http://localhost:4000/search?name=spells")
                setSpells(res.data.results)
            } catch (error) {
                console.log(error)
            }
        }
        FetchAllSpells()
    },[])

	const handleSearch = (value) => {
		setInput(value)
		const res = spells.filter((item) => {
			return value && item && item.name && item.name.toLowerCase().includes(value)
		})
		setResults(res.slice(0,10))
		console.log(results)
	}

	return (
		<div>
			<div className="searchbar">
				<FaSearch/>
				<input placeholder="search the 5e ruleset" value={input} onChange={e => handleSearch(e.target.value)}/>
			</div>
			<table className="searchresults">
				<tbody>
					{results.map((result, id) => {
						return <tr className="searchresult"><button key={id}>{result.name}</button></tr>
					})}
				</tbody>
			</table>
		</div>
	)
}

export default Searchbar