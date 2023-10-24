import React, {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import DMTable from "../components/DMTable"
import DMSpell from "../components/DMSpell"
import Searchbar from "../components/Searchbar"
import axios from 'axios'

const Screen = () => {

	const [show1, setShow1] = useState(true)
	const [show2, setShow2] = useState(true)
	const [key, setKey] = useState(0)
	const [rulesleft, setRulesleft] = useState([])
	const [rulesright, setRulesright] = useState([])
	const [tabs, setTabs] = useState([{name : "improved-initiative", url : "https://improvedinitiative.app", id : 0}])
	const [pagetab, setPageTab] = useState(tabs[0])

	const navigate = useNavigate()

	const handleNavigate = async e =>{
		e.preventDefault()
		navigate("/")
	}

	const handleRemoveleft = (id) =>{
		let newrules = rulesleft
		setRulesleft(newrules.filter(item => item.thekey !== id))
		console.log("removed " + id)
	}

	const handleRemoveright = (id) =>{
		let newrules = rulesright
		setRulesright(newrules.filter(item => item.thekey !== id))
		console.log("removed " + id)
	}

	const data = {
		title : "Testable",
		roll : "TRUE",
		headers : ["d10","One","Two"],
		rows : [
			[[1,5], "r1c2", "The quick brown fox jumps over the lazy dog"],
			[[6,9], "r2c2", "Once upon a time in a land far far away"],
			[[10], "r3c2", "Rocks fall. Each party member takes 100d10 damage"]
		]
	}

	const ruleaddLeft = (spell) => {
		setRulesleft(rulesleft => [...rulesleft, {spell : spell, thekey : key}])
		setKey(key + 1)
	}

	const ruleaddRight = (spell) => {
		setRulesright(rulesright => [...rulesright, {spell : spell, thekey : key}])
		setKey(key + 1)
	}

	const tabClick = (tab) => {

	}

	const removeTab = (deltab) => {
		let newtabs = tabs
		let newcurrtab = tabs[tabs.findIndex(t => {return t.name === deltab.name}) - 1]
		setTabs(newtabs.filter(tab => tab.name !== deltab.name))
		if(pagetab.name === deltab.name){
			setPageTab(newcurrtab)
		}
	}

	return (
		<div className="App">{console.log(rulesleft)}
			<div className="header">
				<h1>DMScreen</h1>
				<button onClick={handleNavigate}>Logout</button>
			</div>
			<div className="mainArea">
				{show1 ? 
					<div className={show2 ? "tableArea" : "bigtableArea"}>
						<Searchbar settheRules={ruleaddLeft}/>
						<DMTable tableData = {data}/>
						{rulesleft.map((rule, id) => {
							return <DMSpell data={rule} handleRemove={handleRemoveleft} index={id}/>
						})}
					</div>
				: null}
				<div className="collapser">
					<button onClick={() => setShow1(show1 => !show1)}>{show1 ? <b>&lt;</b> : <b>&gt;</b>}</button>
				</div>
				<div className="iframediv">
					<div className="tabbar">
						{tabs.map((tab, id) => {
							return <button className={tab.name === pagetab.name ? "currenttab" : "tab"} onClick={(tab) => tabClick(tab)}>{tab.name}<button className="tabbutton" onClick={(tab) => removeTab(tab)}>x</button></button>
						})}
						<button className="currenttab">test<button className="tabbutton">x</button></button>
						<button className="tab">test2<button className="tabbutton">x</button></button>
						<button className="tab">test2<button className="tabbutton">x</button></button>
						<button className="tabadd"><b>+</b></button>
					</div>
					<iframe src={pagetab.url} title={pagetab.name}></iframe>
				</div>
				<div className="collapser">
					<button className="collapsebtnright" onClick={() => setShow2(show2 => !show2)}>{show2 ? <b>&gt;</b> : <b>&lt;</b>}</button>
				</div>
				{show2 ? 
					<div className={show1 ? "tableArea" : "bigtableArea"}>
						<Searchbar setRules={ruleaddRight}/>
						<DMTable tableData = {data}/>
						{rulesright.map((rule, id) => {
							return <DMSpell spell={rule} handleRemove={handleRemoveright} index={id}/>
						})}
					</div> 
				: null}
			</div>
    	</div>
	)
}

export default Screen