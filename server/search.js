var MongoClient = require('mongodb').MongoClient;
var mongourl = 'mongodb://192.168.17.52:27050/db_resort';
var path = require('path');
var request = require("request");
var fs = require('fs');


var udb=null;
initDB();
function initDB(){
  MongoClient.connect(mongourl, function(err, db) {
    udb=db.db('db_resort');
  });
}


function getWaiting(date,id,callback){
  var datea = date.split(',');
  var dataaa = dataa.map(function(e){return parseInt(e.trim())})
  var cl_beijing_universal = udb.collection('cl_beijing_universal');
  cl_beijing_universal.find({id:id,date:{'$in':dataaa},hour:{'$gte':9,'$lte':21},min:{'$in':[0,15,30,45]}}).toArray(function(err,result){
    callback(result);
  })
}

function getWaitingDur(date1,date2,id,callback){
  if(date2-date1>10){
    callback([]);
    return;
  }
  var cl_beijing_universal = udb.collection('cl_beijing_universal');
  cl_beijing_universal.find({id:id,date:{'$gte':date1,'$lte':date2},hour:{'$gte':9,'$lte':21},min:{'$in':[0,15,30,45]}}).toArray(function(err,result){
    callback(result);
  })
}

module.exports={
  getWaiting,
  getWaitingDur
}

