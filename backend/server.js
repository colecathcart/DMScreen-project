
const express = require('express');
const axios = require('axios');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 4000
app.use(express.json())
app.use(cors())

app.get("/screen",(request, response)=>{
	const name = request.query.name
	axios.get("https://www.dnd5eapi.co/api/"+name)
	.then((res)=>{
		console.log(res.data)
		return response.json(res.data)
	})
	.catch(function(error){
		console.log(error)
	})
})

app.get("/search",(request, response)=>{
	const url = request.query.url
	axios.get("https://www.dnd5eapi.co"+url)
	.then((res)=>{
		console.log(res.data)
		return response.json(res.data)
	})
	.catch(function(error){
		console.log(error)
	})
})

app.listen(port, () => console.log(`Listening on port ${port}`));