
const express = require('express');
const app = express();
const {mongoose} = require('./db/connection');
const bodyParser = require('body-parser');
var cors = require('cors')
const auditRoute = require('./routes/auditRoute')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());


//home router
app.get('/api/v1/', (req, res) => {
    res.send('hello from audit API!!')
})

app.use('/api/v1/audit/', auditRoute);
//auth router parsing

//default error routers
app.use((req, res) => {
    res.status(404).send('404 route not found!')
})

app.listen(3000,()=>{
    console.log('server running on 3000 PORT');
})


