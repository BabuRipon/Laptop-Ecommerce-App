const express=require('express');
const app=express();
const path=require('path');
const cors=require('cors');
const morgan=require('morgan');
const mongoose=require('mongoose');
const bodyParser=require('body-parser')
const fs=require('fs');
require('dotenv').config()

// const PORT=process.env.PORT || 3001

const {readdirSync}=fs


//database connection
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex: true,
})
.then(()=>{
    console.log('DB connected.')
})
.catch(error=>{
    console.log('some error occure to connect DB.')
})

//use middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({limit:'5mb'}));

//route middleware
readdirSync('./routes').map(r=>app.use('/api',require(`./routes/${r}`)));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'portfolio','build','index.html'))
})

//listening to the server
app.listen(3001,()=>{
    console.log(`server is running on port 3001`);
})


//lsof -i tcp:3001
//kill -9 id(33845 like)