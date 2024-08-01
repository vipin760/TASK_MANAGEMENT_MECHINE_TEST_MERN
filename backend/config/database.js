const mongoose = require('mongoose')

const connectDb = () =>{
    try {
        mongoose.connect(process.env.DB_URL).then(data=>{
            console.log(`database connected on port ${data.connection.host}`);
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = connectDb