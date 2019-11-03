const mongoose = require('mongoose')

const createDB = cb => {
    cb = cb || (() => null)
    const uri = process.env.MONGODB_URI || `mongodb://localhost/${process.env.MONGODB_LOCAL || 'please-set-process-env-mongodb-uri'}`

    mongoose.connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        .then(x => {
            console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
            cb()
            return x
        })
        .catch(err => {
            console.error('Error connecting to mongo', err)
        })

    mongoose.connection.on('connected', function() {
        console.log(`Mongoose default connection is open to ${uri}`);
    });

    mongoose.connection.on('error', function(err) {
        console.log(`Mongoose default connection has occurred ${err} error`);
    });

    mongoose.connection.on('disconnected', function() {
        console.log(`Mongoose default connection is disconnected from ${uri}`);
    });

    process.on('SIGINT', function() {
        mongoose.connection.close(function() {
            console.log(`Mongoose default connection to ${uri} is disconnected due to application termination`);
            process.exit(0)
        });
    });
    return mongoose.connection
}

module.exports = createDB