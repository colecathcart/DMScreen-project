
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const DMTable = require('./dbmodels/dmtable')
const DMCard = require('./dbmodels/dmcard')
const User = require('./dbmodels/user')
const uri = "mongodb+srv://colecathcart:W0fC4N4ig3x41CvI@cluster0.veinmfc.mongodb.net/DMScreen?retryWrites=true&w=majority"
const app = express();
const port = process.env.PORT || 4000
const SECRET = 'replacethiswitharealsecret'
const CLIENT_URL = 'http://localhost:3000'

app.use(express.json())
app.use(cors({origin: CLIENT_URL, credentials: true}))
app.use(cookieParser())

if(process.env.NODE_ENV === 'production') {
	app.use(express.static('../app/build'))
	app.get('*',(req,res) => {
		res.sendFile(path.resolve(__dirname, 'app', 'build', 'index.html'))
	})
}

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

app.get("/logout", (req, res)=>{
	res.clearCookie('token', {sameSite: 'strict', httpOnly: true})
	res.send("logged out")
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

app.post("/newtable",(request, response)=>{
	console.log(request.cookies)
	const token = request.cookies.token
	console.log(request.body)
	try {
		const username = jwt.verify(token, SECRET)
		const dmtable = new DMTable({
			username : username,
			title : request.body.title,
			roll : request.body.roll,
			headers : request.body.headers,
			rows : request.body.rows
		})
		dmtable.save()
			.then((result) => {
				response.send(result)
			})
			.catch((err) => {
				console.error(err)
			})
	} catch (err){
		console.error(err)
	}
})

app.post("/newcard", (request, response)=>{
	const token = request.cookies.token
	console.log(request.body)
	try {
		const username = jwt.verify(token, SECRET)
		const dmcard = new DMCard({
			username : username,
			title : request.body.title,
			description : request.body.desc
		})
		dmcard.save()
			.then((result) => {
				response.send(result)
			})
			.catch((err) => {
				console.error(err)
			})
	} catch (err){
		console.error(err)
	}
})

app.put("/updatecard", (request, response) => {
	const token = request.cookies.token
	try {
		const username = jwt.verify(token, SECRET)
		console.log(request.body)
		
		DMCard.findById(request.body._id)
			.then((res)=>{
				console.log(res)
				res.title = request.body.title
				res.description = request.body.desc
				res.save()
					.then((result)=>{
						response.send(result)
					})
					.catch((err) => {
						console.error(err)
					})
			})
			.catch((err)=>{
				console.error(err)
			})
	} catch (err) {
		console.error(err)
	}
})

app.put("/updatetable", (request, response) => {
	const token = request.cookies.token
	try {
		const username = jwt.verify(token, SECRET)
		console.log(request.body)
		
		DMTable.findById(request.body._id)
			.then((res)=>{
				console.log(res)
				res.title = request.body.title
				res.roll = request.body.roll
				res.headers = request.body.headers
				res.rows = request.body.rows
				res.save()
					.then((result)=>{
						response.send(result)
					})
					.catch((err) => {
						console.error(err)
					})
			})
			.catch((err)=>{
				console.error(err)
			})
	} catch (err) {
		console.error(err)
	}
})

app.delete("/deletecard", (request, response) => {
	const token = request.cookies.token
	try {
		DMCard.deleteOne({_id: request.headers._id})
			.then((res)=>{
				response.send(res)
			})
			.catch((err)=>{
				console.error(err)
			})
	} catch (err) {
		console.error(err)
	}
})

app.delete("/deletetable", (request, response) => {
	const token = request.cookies.token
	try {
		DMTable.deleteOne({_id: request.headers._id})
			.then((res)=>{
				response.send(res)
			})
			.catch((err)=>{
				console.error(err)
			})
	} catch (err) {
		console.error(err)
	}
})

app.get("/gettables", (request, response) => {
	const token = request.cookies.token
	try {
		const username = jwt.verify(token, SECRET)
		DMTable.find({username: username})
		.then((res) => {
			response.send(res)
		})
		.catch((err) => {
			console.error(err)
		})
	} catch (err) {
		console.error(err)
	}
})

app.get("/getcards", (request, response) => {
	const token = request.cookies.token
	try {
		const username = jwt.verify(token, SECRET)
		DMCard.find({username: username})
		.then((res) => {
			response.send(res)
		})
		.catch((err) => {
			console.error(err)
		})
	} catch (err) {
		console.error(err)
	}
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
