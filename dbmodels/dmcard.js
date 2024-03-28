const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dmcardSchema = new Schema({
	username: String,
	title: String,
	description: String
})

const DMCard = mongoose.model('dmcard', dmcardSchema)
module.exports = DMCard