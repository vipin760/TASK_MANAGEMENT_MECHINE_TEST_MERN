const express = require('express')
const app = express()
const dotenv = require('dotenv');
const connectDb = require('./config/database');
const cors = require('cors')

dotenv.config({path:"./config/.env"});
const port = process.env.PORT || 4000
//middleware application

app.use(cors());
app.use(express.json());


// connect database 
connectDb();

// routes
const task_routes = require('./routes/task.routes')
const user_routes = require('./routes/user.routes')
app.use('/',task_routes);
app.use('/user',user_routes);

app.listen(port,()=>{
    console.log(`server connetced on port ${process.env.PORT}`);
})