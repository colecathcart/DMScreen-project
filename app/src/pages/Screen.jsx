import React, {useState, useEffect} from "react"
import axios from 'axios'
import Cookies from 'js-cookie'
import {useNavigate} from "react-router-dom"
import DMTable from "../components/DMTable"
import DMSpell from "../components/DMSpell"
import DMRule from "../components/DMRule"
import DMItem from "../components/DMItem"
import DMCard from "../components/DMCard"
import Diceroller from "../components/Diceroller"
import Searchbar from "../components/Searchbar"
import {FaCaretLeft, FaCaretRight} from "react-icons/fa6";
import { FaDiceD20 } from "react-icons/fa";

const API_URL = process.env.REACT_APP_API_URL

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
	const [idcount, setIdcount] = useState(1)
	const [exleft, setExleft] = useState(false)
	const [exright, setExright] = useState(false)
	const [searchid1, setSearchid1] = useState(0)
	const [searchid2, setSearchid2] = useState(0)

	let newtabname = ""
	let newtaburl = ""

	const navigate = useNavigate()

	useEffect(()=>{
		if(!tabs.includes(pagetab)) {
			setPageTab(tabs[0])
		}
	},[tabs])

	const setuserData1 = () => {
		setSearchid1(Math.random())
	}

	const setuserData2 = () => {
		setSearchid2(Math.random())
	}

	const handleLogout = async e =>{
		e.preventDefault()
		axios.get(API_URL + "logout", {withCredentials: true})
			.then(() => {
				Cookies.remove("username", {sameSite: 'strict'})
				navigate("/")
			})
			.catch((err) =>{
				console.log(err)
			})
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

	const ruleaddLeft = (rule) => {
		setRulesleft(rulesleft => [...rulesleft, {rule : rule, thekey : key}])
		setKey(key + 1)
	}

	const ruleaddRight = (rule) => {
		setRulesright(rulesright => [...rulesright, {rule : rule, thekey : key}])
		setKey(key + 1)
	}

	const removeTab = (deltab) => {
		if(pagetab.id === deltab.id){
			pagetabSetter(tabs[0])
		}
		let newtabs = [...tabs]
		let filteredtabs = newtabs.filter(tab => tab.id !== deltab.id)
		setTabs(filteredtabs)
	}

	const pagetabSetter = (tab) => {
		if(tabs.includes(tab)){
			setPageTab(tab)
		} else {
			setPageTab(tabs[0])
		}
	}

	const handleAddTab = () => {
		const newtab = {name: newtabname, url: newtaburl, id: idcount}
		setIdcount(idcount + 1)
		setTabs(tabs => [...tabs, newtab])
		setPageTab(newtab)
		setErrMsg(false)
		setNewTabScreen(false)
		newtabname = ""
		newtaburl = ""
	}

	const componentMatcher = (rule, remover, id) => {
		if(rule.rule.title){
			return rule.rule.headers ? <DMTable tableData={rule} handleRemove={remover}/> : <DMCard data={rule} handleRemove={remover} index={id}/>
		}else if(rule.rule.url.match("/api/spells")){
			return <DMSpell data={rule} handleRemove={remover} index={id}/>
		} else if(rule.rule.url.match("/api/equipment") || rule.rule.url.match("/api/magic-items")){
			return <DMItem data={rule} handleRemove={remover} index={id}/>
		} else {
			return <DMRule data={rule} handleRemove={remover} index={id}/>
		}
		
	}

	return (
		<div className="App">{console.log(rulesleft)}
			<div className="header">
				<FaDiceD20 size={42}/>
				<h1>DMScreen</h1>
				<div>
					<p>{Cookies.get('username')}</p>
					<button onClick={handleLogout}>Logout</button>
				</div>
			</div>
			<div className="mainArea">
				{show1 ? 
					<div className={exleft ? "bigtableArea" : "tableArea"}>
						<Searchbar settheRules={ruleaddLeft} right={false} setuserData={setuserData2} key={searchid1}/>
						{rulesleft.map((rule, id) => {
							return componentMatcher(rule, handleRemoveleft, id)
						})}
					</div>
				: null}
				<div className="collapser">
					<button style={!show2 && exleft ? {display: "none"} : null} onClick={() => setShow1(show1 => !show1)}>{show1 ? <FaCaretLeft/> : <FaCaretRight/>}</button>
					<button disabled={show2} style={show1 && !show2 ? null : {display: "none"}} onClick={()=>setExleft(exleft => !exleft)}>{ exleft ? <FaCaretLeft/> : <FaCaretRight/>}</button>
				</div>
				<div className="iframediv">
					<div className="tabbar">
						{tabs.map((tab, id) => {
							console.log(tab)
							return <button className={tab.id === pagetab.id ? "currenttab" : "tab"} onClick={() => pagetabSetter(tab)}><p className="tabtext">{tab.name}</p>{tab.id === -1 ? null : <button className="tabbutton" onClick={() => removeTab(tab)}>x</button>}</button>
						})}
						<div>
							{newtabscreen ? 
								<div className="newtabwindow">
									<input placeholder="tab name" onChange={e => {newtabname = e.target.value}}></input>
									{errmsg ? <i style={{color: 'red'}}>name must be unique</i> : null}
									<input placeholder="url" onChange={e => {newtaburl = e.target.value}}></input>
									<div>
										<button style={{float: 'left'}} onClick={handleAddTab}>Ok</button>
										<button style={{float: 'right'}} onClick={() => {setNewTabScreen(false); setErrMsg(false)}}>x</button>
									</div>
								</div> 
							: null}
						</div>
						<button className="tabadd" onClick={() => setNewTabScreen(true)}><b>+</b></button>
					</div>
					{tabs.map((tab, id) => {
						return tab.id === -1 ? 
							<Diceroller display={tab.name === pagetab.name ? true : false}/>
						: 
							<iframe src={tab.url} title={tab.name} style={tab.name === pagetab.name ? {display: 'block'} : {display: 'none'}}></iframe>
					})}
					
				</div>
				<div className="collapser">
					<button disabled={show1} style={show2 && !show1 ? null : {display: "none"}} onClick={()=>setExright(exright => !exright)}>{ exright ? <FaCaretRight/> : <FaCaretLeft/>}</button>
					<button style={!show1 && exright ? {display: "none"} : null} className="collapsebtnright" onClick={() => setShow2(show2 => !show2)}>{show2 ? <FaCaretRight/> : <FaCaretLeft/>}</button>
				</div>
				{show2 ? 
					<div className={exright ? "bigtableArea" : "tableArea"}>
						<Searchbar settheRules={ruleaddRight} right={true} setuserData={setuserData1} key={searchid2}/>
						{rulesright.map((rule, id) => {
							return componentMatcher(rule, handleRemoveright, id)
						})}
					</div> 
				: null}
			</div>
    	</div>
	)
}

export default Screen