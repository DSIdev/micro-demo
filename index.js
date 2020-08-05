const fastify = require('fastify')({ logger: true })
function sleep(time, data) {
	return new Promise(resolve => setTimeout(() => resolve(data || {
		time: (new Date()).toISOString()
	}), time))
}
// Declare a route
fastify.get('/', async (request, reply) => {
	return await sleep(2000)
})

// Run the server!
const start = async () => {
	try {
		await fastify.listen(3000)
		fastify.log.info(`server listening on ${fastify.server.address().port}`)
	} catch (err) {
		fastify.log.error(err)
		process.exit(1)
	}
}
start()