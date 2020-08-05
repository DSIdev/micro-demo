const db = require("./db")
exports.sleep = function sleep(time, data) {
	return new Promise(resolve => setTimeout(() => resolve(data || {
		time: (new Date()).toISOString()
	}), time))
}

exports.setupConsumers = function setupConsumers(channel, connInfo) {
	channel.consume(connInfo.queueName, function handleConsumedMessage(msg) {
		console.log(msg.content.toString())
		setTimeout(() => channel.ack(msg), 20 * 1000);
	})
}
