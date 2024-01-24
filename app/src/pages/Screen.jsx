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
	const [tabs, setTabs] = useState([
		{name : "dice roller", url : "test.html", id : -1},
		{name : "improved-initiative", url : "https://improvedinitiative.app", id : 0}])
	const [pagetab, setPageTab] = useState(tabs[0])
	const [newtabscreen, setNewTabScreen] = useState(false)
	const [errmsg, setErrMsg] = useState(false)

	let newtabname = ""
	let newtaburl = ""

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

	const removeTab = (deltab) => {
		if(pagetab.name === deltab.name){
			console.log("here")
			console.log(tabs[0])
			setPageTab(tabs[0])
			console.log("tabs:", tabs)
			console.log(tabs[0])
			console.log("name:",pagetab)
		}
		console.log(deltab)
		let newtabs = tabs
		let filteredtabs = newtabs.filter(tab => tab.name !== deltab.name)
		setTabs(filteredtabs)
	}

	const handleAddTab = () => {
		if(tabs.findIndex((tab) => tab.name === newtabname) !== -1){
			newtabname = ""
			setErrMsg(true)
		} else {
			const newtab = {name: newtabname, url: newtaburl}
			setTabs(tabs => [...tabs, newtab])
			setPageTab(newtab)
			setErrMsg(false)
			setNewTabScreen(false)
			newtabname = ""
			newtaburl = ""
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
							console.log(tab)
							return <button className={tab.name === pagetab.name ? "currenttab" : "tab"} onClick={() => setPageTab(tab)}>{tab.name}{tab.id === -1 ? null : <button className="tabbutton" onClick={() => removeTab(tab)}>x</button>}</button>
						})}
						<div>
							<button className="tabadd" onClick={() => setNewTabScreen(true)}><b>+</b></button>
							{newtabscreen ? 
								<div className="newtabwindow">
									<input placeholder="tab name (must be unique)" onChange={e => {newtabname = e.target.value}}></input>
									{errmsg ? <i style={{color: 'red'}}>name must be unique</i> : null}
									<input placeholder="url" onChange={e => {newtaburl = e.target.value}}></input>
									<div>
										<button style={{float: 'left'}} onClick={handleAddTab}>Ok</button>
										<button style={{float: 'right'}} onClick={() => {setNewTabScreen(false); setErrMsg(false)}}>x</button>
									</div>
								</div> 
							: null}
						</div>
					</div>
					{tabs.map((tab, id) => {
						return <iframe src={tab.url} title={tab.name} style={tab.name === pagetab.name ? {display: 'block'} : {display: 'none'}}></iframe>
					})}
					
				</div>
				<div className="collapser">
					<button className="collapsebtnright" onClick={() => setShow2(show2 => !show2)}>{show2 ? <b>&gt;</b> : <b>&lt;</b>}</button>
				</div>
				{show2 ? 
					<div className={show1 ? "tableArea" : "bigtableArea"}>
						<Searchbar settheRules={ruleaddRight}/>
						<DMTable tableData = {data}/>
						{rulesright.map((rule, id) => {
							return <DMSpell data={rule} handleRemove={handleRemoveright} index={id}/>
						})}
					</div> 
				: null}
			</div>
    	</div>
	)
}

export default Screen