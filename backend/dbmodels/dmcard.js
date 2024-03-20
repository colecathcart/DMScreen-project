const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dmcardSchema = new Schema({
	title: String,
	description: String
})

const DMCard = mongoose.model('dmcard', dmcardSchema)
module.exports = DMCard