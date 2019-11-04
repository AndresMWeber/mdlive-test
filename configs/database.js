const mongoose = require('mongoose')

const createDB = async(verbose) => {
    const uri = process.env.MONGODB_URI || `mongodb://localhost/${process.env.MONGODB_LOCAL || 'please-set-process-env-mongodb-uri'}`
    const communicate = message => {
        verbose && console.log(message)
    }

    await mongoose.connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        .then(x => {
            communicate(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
            return x
        })
        .catch(err => {
            communicate('Error connecting to mongo', err)
        })

    mongoose.connection.on('connected', function() {
        communicate(`Mongoose default connection is open to ${uri}`);
    });

    mongoose.connection.on('error', function(err) {
        communicate(`Mongoose default connection has occurred ${err} error`);
    });

    mongoose.connection.on('disconnected', function() {
        communicate(`Mongoose default connection is disconnected from ${uri}`);
    });

    process.on('SIGINT', function() {
        mongoose.connection.close(function() {
            communicate(`Mongoose default connection to ${uri} is disconnected due to application termination`);
            process.exit(0)
        });
    });
    return mongoose.connection
}

module.exports = createDB