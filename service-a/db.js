const utils = require("./utils")
module.exports = {
	getFromDB: function (data) {
		return utils.sleep(1000, { DBResult: { _id: "0000", data: data.toString() || "DB DATA" } })
	}
}