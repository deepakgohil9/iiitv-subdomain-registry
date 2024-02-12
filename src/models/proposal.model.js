const mongoose = require('mongoose')

const proposal = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: true
	},
	action: {
		type: String,
		enum: ['create', 'update', 'delete'],
		required: true
	},
	domain: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'domain',
		required: true
	},
	name: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	type: {
		type: String,
		enum: ['A', 'AAAA', 'CNAME', 'TXT', 'MX', 'NS'],
		required: true
	},
	priority: {
		type: Number,
		default: 0
	},
	ttl: {
		type: Number,
		default: 1
	},
	proxied: {
		type: Boolean,
		default: true
	},
	status: {
		type: String,
		enum: ['pending', 'approved', 'rejected'],
		default: 'pending'
	},
	purpose: {
		type: String
	}
}, {
	timestamps: true
})

module.exports = mongoose.model('proposal', proposal)
