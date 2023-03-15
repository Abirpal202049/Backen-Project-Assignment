const mongoose = require("mongoose");

const connectWithDb = () => {
	mongoose
		.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(console.log(`DB Connected Successfully`))
		.catch((error) => {
			console.log(`DB CONNECTION ISSUES`);
			console.log(error);
			process.exit(1);
		});
};

module.exports = connectWithDb;