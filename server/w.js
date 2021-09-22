const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var request = require('request');
const {getWaiting,getWaitingDur} = require('./search')

const {getlist} = require('./fetch');

app.get('/',function(req,res){
  res.send('ok')
})
app.get('/a',function(req,res){
  res.send('ok')
})

app.get('/get_waiting_by_date',function(req,res){
  var data = req.query;
  var id = data.id;
  var date = parseInt(data.date);
  console.log(id,date);
  getWaiting(date,id,function(result){
    var ret = {};
    ret.r=0;
    ret.d = result;
    res.set('Content-Type','text/plain');
    res.send(JSON.stringify(ret));
  })
})

app.get('/get_waiting_by_date_dur',function(req,res){
  var data = req.query;
  var id = data.id;
  var date1 = parseInt(data.date1);
  var date2= parseInt(data.date2);
  getWaitingDur(date1,date2,id,function(result){
    var ret = {};
    ret.r=0;
    ret.d = result;
    res.set('Content-Type','text/plain');
    res.send(JSON.stringify(ret));
  })
})

app.get('/list',function(req,res){
  if(getlist().length>1){
    res.set('Content-Type','text/plain');
    res.send(getlist());
  }else{
    var url = 'https://gw.app.universalbeijingresort.com/attraction/list?sort_type=0&support_express=0&suitable_children=0&accessibility=0&page=1&page_size=1000'
    var url2 = 'http://54.250.49.236:6660/url?url='+encodeURIComponent(url);
    request({
      url: url2,
      method: "GET"
    }, function(error, response, body){
      if(error&&error.code){
        console.log('pipe error catched!')
        console.log(error);
      }
    }).pipe(res);
  }
})

app.get('/url',function(req,res){
  var data = req.query;
  var url = data.url;
  request({
    url: url,
    method: "GET"
  }, function(error, response, body){
    if(error&&error.code){
      console.log('pipe error catched!')
      console.log(error);
    }
  }).pipe(res);
})

var port = 6660;
app.listen(port,function(){
  console.log('now listen '+port)
})

