const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

require('./fetch');

app.get('/',function(req,res){
  res.send('ok')
})
app.get('/a',function(req,res){
  res.send('ok')
})

var port = 6660;
app.listen(port,function(){
  console.log('now listen '+port)
})

