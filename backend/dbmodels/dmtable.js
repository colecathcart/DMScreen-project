const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dmtableSchema = new Schema({
	username: String,
	title : String,
	roll : String,
	headers : Array,
	rows : Array
})

const DMTable = mongoose.model('dmtable', dmtableSchema)
module.exports = DMTable