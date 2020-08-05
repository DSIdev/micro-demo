const dotenv = require("dotenv").config()
const fastify = require('fastify')({ logger: true })
const utils = require("./utils")
const db = require("./db")
const mq = require("../mq")
let q = null;

// Declare a route
fastify.get('/db', async (request, reply) => {
	const channel1 = await mq.getChannel()
	const channel = await mq.getChannel()
	console.error(channel === channel1)
	channel.sendToQueue(mq.connectionInfo().queueName, Buffer.from(JSON.stringify({ test: 1, date: (new Date()).toString() })))
	return await db.getFromDB("hello")
})

// Run the server!
const start = async () => {
	try {
		q = await mq.getChannel()
		utils.setupConsumers(q, mq.connectionInfo())
		await fastify.listen(3001)
		fastify.log.info(`SERVICE A: server listening on ${fastify.server.address().port}`)
	} catch (err) {
		fastify.log.error(err)
		process.exit(1)
	}
}
start()