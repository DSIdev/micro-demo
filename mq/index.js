const amqplib = require('amqplib')
const config = {
	queueUrl: `amqp://ocwjyhkv:y0o2ZKzPqLHC3TToc-4gARmQ81FKKhJW@cougar.rmq.cloudamqp.com/ocwjyhkv`,
	queueName: `testqueue`
}
const createConnection = async function () {
	const conn = await amqplib.connect(config.queueUrl)
	if (conn)
		return conn.createChannel(config.queueUrl);
}
module.exports = {
	rabbitMQConnection: null,
	getChannel: function () {
		if (this.rabbitMQConnection) return this.rabbitMQConnection
		else {
			this.rabbitMQConnection = createConnection()
			return this.rabbitMQConnection
		}
	},
	connectionInfo: function () {
		return {
			queueName: config.queueName
		}
	}
}
