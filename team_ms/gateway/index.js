const express = require('express');

const app = express();
const cors = require('cors');
const proxy = require('express-http-proxy');

app.use(cors());
app.use(express.json());

app.use('/team',proxy('http://localhost:8001'))
app.use('/',proxy('http://localhost:8002'))



app.listen(8004,()=>{

    console.log('Gateway is Listening at 8004')
})