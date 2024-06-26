const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const helmet = require('helmet')
const { xss } = require('express-xss-sanitizer')
const connect = require('./databases/mongo.database')

dotenv.config()

const errorHandler = require('./middlewares/errorHandler.middleware')
const sanitizer = require('./middlewares/sanitizer.middleware')

const authRoute = require('./routes/auth.route')
const domainRoute = require('./routes/domain.route')
const proposalRoute = require('./routes/proposal.route')
const subdomainRoute = require('./routes/subdomain.route')

const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(helmet())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(xss())
app.use(sanitizer)

app.use('/auth', authRoute)
app.use('/domain', domainRoute)
app.use('/proposal', proposalRoute)
app.use('/subdomain', subdomainRoute)

app.get('/', (req, res) => res.send({ message: '🚀 Hello! I am alive!' }))
app.use((req, res) => res.send({ message: '🚧 Error 404: Requested endpoint not found.' }))
app.use(errorHandler)

app.listen(PORT, async () => {
	// eslint-disable-next-line no-console
	console.log('🚀 Server Started!')
	await connect()
})
