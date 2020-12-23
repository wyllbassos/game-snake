const express = require('express')
const router = express.Router();

const app = express();

app.use(express.static('public'));

app.get('/', (Request, Response) => {
    Response.sendFile('')
})

app.use('/', router);

app.listen(3000, () => {
    console.log('Server Start at port 3000')    
})