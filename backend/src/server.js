const express = require('express');
const app = express();
const routes = require('./routes');
const cors = require('cors');
const port = process.env.PORT || 3500;



app.use(cors());

app.use(routes);

app.listen(port, ()=>{
    console.log("Server running port "+port)
})