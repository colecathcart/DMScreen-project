
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const DMTable = require('./dbmodels/dmtable')
const User = require('./dbmodels/user')
const uri = "mongodb+srv://colecathcart:W0fC4N4ig3x41CvI@cluster0.veinmfc.mongodb.net/DMScreen?retryWrites=true&w=majority"
const app = express();
const port = process.env.PORT || 4000
const SECRET = 'replacethiswitharealsecret'
const CLIENT_URL = 'http://localhost:3000'

app.use(express.json())
app.use(cors({origin: CLIENT_URL, credentials: true}))
app.use(cookieParser())

async function connect() {
	try {
		await mongoose.connect(uri)
		console.log("Connected to MongoDB")
	} catch (err) {
		console.error(err)
	} finally {
		app.listen(port, () => console.log(`Listening on port ${port}`));
	}
}
connect()

app.get("/verify", (req, res)=>{
	console.log(req.cookies)
	const token = req.cookies.token
	console.log("token to verify: " + token)
	try {
		const result = jwt.verify(token, SECRET)
		console.log("verified " + result)
		res.send(result)
	} catch (err) {
		res.send("Failed")
	}
})

app.get("/login", (request, response)=>{
	User.find({username: request.headers.username})
		.then((res) => {
			if(res.length === 0){
				response.send(res)
			} else {
				const user = res[0]
				bcrypt.compare(request.headers.password, user.password)
					.then((res) => {
						if(res){
							const token = jwt.sign(user.username, SECRET)
							response.cookie('token', token, {sameSite: 'strict', httpOnly: true})
							response.send(['logged in'])
						} else {
							response.send([])
						}
					})
					.catch((err)=>{
						console.error(err)
					})
			}
		})
		.catch((err) => {
			console.error(err)
		})
})

app.post("/create", (request, response)=>{
	User.find({username: request.body.username})
		.then((res) => {
			if(res.length !== 0){
				response.send([])
			} else {
				bcrypt.hash(request.body.password, 10)
					.then((res) => {
						const user = new User({
							username: request.body.username,
							password: res
						})
						user.save()
							.then((res) => {
								response.send(['account created'])
							})
							.catch((err) => {
								console.error(err)
							})
					})
					.catch((err) => {
						console.error(err)
					})
			}
		})
		.catch((err) => {
			console.error(err)
		})
})

app.get("/newtable",(request, response)=>{
	const dmtable = new DMTable({
		title : "Testable",
		roll : "TRUE",
		headers : ["d10","One","Two"],
		rows : [
			[[1,5], "r1c2", "The quick brown fox jumps over the lazy dog"],
			[[6,9], "r2c2", "Once upon a time in a land far far away"],
			[[10], "r3c2", "Rocks fall. Each party member takes 100d10 damage"]
		]
	})
	dmtable.save()
		.then((result) => {
			response.send(result)
		})
		.catch((err) => {
			console.error(err)
		})
})

app.get("/gettables", (request, response) => {
	DMTable.find()
		.then((res) => {
			response.send(res)
		})
		.catch((err) => {
			console.error(err)
		})
})

app.get("/add",(request, response)=>{
	const url = request.query.url
	axios.get("https://www.dnd5eapi.co"+url)
	.then((res)=>{
		if(Array.isArray(res.data.desc)){
			for(let i = 0; i < res.data.desc.length - 1; i++){
				if(res.data.desc[i+1].startsWith('|')){
					res.data.desc[i] += "  \n"
				} else {
					res.data.desc[i] += "  \n\n"
				}
			}
		}
		//console.log(res.data)
		return response.json(res.data)
	})
	.catch(function(error){
		console.error(error)
	})
})

app.get("/search",(request, response)=>{
	const url = request.query.url
	axios.get("https://www.dnd5eapi.co"+url)
	.then((res)=>{
		//console.log(res.data)
		return response.json(res.data)
	})
	.catch(function(error){
		console.error(error)
	})
})
